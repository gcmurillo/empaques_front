import { Component, OnInit, ViewChild } from '@angular/core';
import { Orden } from '../../../shared/orden/orden';
import { TransaccionesService } from '../../../services/transacciones/transacciones.service';
import { UbicacionesService } from '../../../services/ubicaciones/ubicaciones.service';
import { LoginService } from '../../../services/login/login.service';
import { ExcelService } from '../../../services/excel/excel.service';

import docxtemplater from 'docxtemplater';
import * as JSZip from 'jszip';
import * as JSZipUtils from 'jszip-utils';
declare const require: any;
import { saveAs } from 'file-saver';
import swal from 'sweetalert2';

@Component({
    selector: 'app-transacciones-list',
    templateUrl: './transacciones-list.component.html',
    styleUrls: ['./transacciones-list.component.scss',
        '../../../../assets/icon/icofont/css/icofont.scss'
    ]
})
export class TransaccionesListComponent implements OnInit {

    @ViewChild('myTable') table: any;

    rows = [];
    selected = [];
    transacciones_raw = [];
    transacciones = [];
    bodegas = [];
    ordenes_empaques = [];
    empaques: any = {};
    costo_carta = 0;
    tamano_carta = 0;
    URL = '../../../../assets/cartas_templates/carta_template.docx';


    columns: any[] = [
        {
            prop: 'nombre',
            name: 'Nombre',
        },
        {
            prop: 'nueva_ubicacion.bodega.nombre',
            name: 'Bodega'
        },
        {
            prop: 'fecha_inicio',
            name: 'Fecha Inicio'
        },
        {
            prop: 'dias_plazo',
            name: 'Dias de plazo'
        },
        {
            prop: 'aprobado',
            name: 'Aprobado'
        }
    ];

    constructor(private transaccionService: TransaccionesService,
                private ubicacionesService: UbicacionesService,
                private loginService: LoginService,
                private excelService:ExcelService,
            ) { }

    ngOnInit() {

        this.transaccionService.getTransaccionesNoDespachadas().subscribe(
                transacciones => {
                    this.rows = transacciones;
                    this.transacciones = transacciones;
                },    
                err => console.log('error: ' + err.status)
        );

        this.ubicacionesService.getUbicaciones().subscribe(
            ubicaciones => {
                const id_bodegas = [];
                for (const ubi of ubicaciones) {
                    if (!id_bodegas.includes(ubi.bodega.id)) {
                        this.bodegas.push(ubi.bodega);
                        id_bodegas.push(ubi.bodega.id);
                    }
                }
            },
            err => console.log('error: ' + err.status)
        );

        this.loginService.isLoged('CO');
    }

    filtrar_aprobado(status) {
        if (status === 'TODO') {
            this.rows = this.transacciones;
        } else {
            this.rows = this.transacciones.filter(
                transaccion => transaccion.aprobado === status
            );
        }
    }

    filtrar_bodega(bodega) {
        if (bodega === 'TODO') {
            this.rows = this.transacciones;
        } else {
            this.rows = this.transacciones.filter(
                transaccion => transaccion.nueva_ubicacion.bodega.id === bodega
            );
        }
    }

    onSelect({ selected }) {
      this.selected.splice(0, this.selected.length);
      this.selected.push(...selected);
    }

    onActivate(event) {}

    onClickRow(event) {}

    onDetailToggle(event) {}

    toggleExpandRow(row) {
        this.table.rowDetail.toggleExpandRow(row);
      }
    
    updateFilter(event) {
        const val = event.target.value.toLowerCase();
    
        // filter our data
        const temp = this.transacciones.filter(function(d) {
          return d.__str__.toLowerCase().indexOf(val) !== -1 || !val;
        });
    
        // update the rows
        this.rows = temp;
        // Whenever the filter changes, always go back to the first page
        this.table.offset = 0;
    }

    loadFileGeneration(row) { // On click function which triggers docxTemplater function.
        var today = new Date();
        var dd = today.getDate() + 1;
        var mm = today.getMonth(); //January is 0!
        var yyyy = today.getFullYear();
        console.log(row);
        var event = new Date(Date.UTC(yyyy, mm, dd, 0, 0, 0));
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        console.log(event.toLocaleDateString('es-ES', options));
        var fecha = event.toLocaleDateString('es-ES', options);
        var costo = this.costo_carta;
        var tamano = this.tamano_carta;
        function loadFile(url, callback) {
          JSZipUtils.getBinaryContent(url, callback);
        };
        loadFile(this.URL, function (error, content) {
          if (error) { throw error };
          const zip = new JSZip(content);
          const doc = new docxtemplater().loadZip(zip);
          doc.setData({
            empresa: row.nuevo_custodio.representante.empresa.nombre,
            representante: row.nuevo_custodio.representante.nombre,
            fecha: fecha,
            ruc: row.nuevo_custodio.representante.empresa.RUC,
            empaques: row.empaques,
            cantidad_empaques: row.empaques.length,
            dias: row.dias_plazo,
            costo: costo,
            tamano: tamano,
          });
          try {
            // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
            doc.render()
          } catch (error) {
            const e = {
              message: error.message,
              name: error.name,
              stack: error.stack,
              properties: error.properties,
            }
            console.log(JSON.stringify({ error: e }));
            // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
            throw error;
          }
          const out = doc.getZip().generate({
            type: 'blob',
            mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          }) // Output the document using Data-URI
          saveAs(out, 'output.docx')
        })
      }

      openCrearCarta(row) {
        swal.resetDefaults();
        swal.setDefaults({
          input: 'text',
          confirmButtonText: 'Siguiente &rarr;',
          showCancelButton: true,
          progressSteps: ['1', '2']
        });
    
        const steps = [
          {
            title: 'Tamaño',
            text: '64 o 66'
          },
          {
            title: 'Costo',
            text: 'Costo en Dolares'
          }
        ];
    
        swal.queue(steps).then((data) => {
          
          if (data.value) {
            swal.resetDefaults();
            swal({
              title: 'Resumen',
              html:
              'Tus datos: <pre>' +
              JSON.stringify(data.value) +
              '</pre>',
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Crear carta',
              cancelButtonText: 'Cancelar',
              confirmButtonClass: 'btn btn-success',
              cancelButtonClass: 'btn btn-danger mr-sm',
              showCancelButton: true
            }).then((result) => {
                if (result.value) {
                    this.tamano_carta = data.value[0];
                    this.costo_carta = data.value[1];
                    this.loadFileGeneration(row);
                } else if (result.dismiss) {
                    swal.resetDefaults();
                    swal(
                        'Cancelado',
                        'La empresa no fue creada',
                        'error'
                    );
                }
            });
          }
        });
    }

    export() {
      let data = [];
      for (let row of this.rows) {
          let emps = '';
          for (let emp of row.empaques) {
            emps += emp.codigo + ';'
          }
          let obj = {
              "nombre": row.nombre,
              "bodega": row.nueva_ubicacion.bodega.nombre,
              "fecha_inicio": row.fecha_inicio,
              "fecha_final": row.fecha_final,
              "dias_plazo": row.dias_plazo,
              "custodio": row.nuevo_custodio.representante.empresa.nombre,
              "empaques": emps
          }
          data.push(obj);
      }
      console.log(data);
      this.excelService.exportAsExcelFile(data, 'datos_transacciones_no_despachadas');
    }

}
