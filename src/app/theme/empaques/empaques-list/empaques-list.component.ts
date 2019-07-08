import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Empaque, EmpaqueDetail } from '../../../shared/empaque/empaque';
import { EmpaquesService } from '../../../services/empaques/empaques.service';
import { TipoEmpaquesService } from '../../../services/tipo_empaques/tipo_empaques.service';
import { UbicacionesService } from '../../../services/ubicaciones/ubicaciones.service';
import { ClasesService } from '../../../services/clases/clases.service';
import { LoginService } from '../../../services/login/login.service';
import { ExcelService } from '../../../services/excel/excel.service';
import { Papa } from 'ngx-papaparse';
import swal from 'sweetalert2';


@Component({
    selector: 'app-empaques-list',
    templateUrl: './empaques-list.component.html',
    styleUrls: [
        './empaques-list.component.scss',
        '../../../../assets/icon/icofont/css/icofont.scss'
    ]
})
export class EmpaquesListComponent implements OnInit {

    rows = [];
    selected = [];
    empaques = [];
    tipo_empaques = [];
    ubicaciones = [];
    clases = [];
    fileToUpload: any;

    @ViewChild('table') table: any;
    @ViewChild('modalDefault') modal: any;


    columns: any[] = [
        {
            prop: '__str__',
            name: 'Nombre'
        },
        {
            prop: 'codigo',
            name: 'Codigo'
        },
        {
            prop: 'codigo_barras',
            name: 'Codigo Barras'
        },
        {
            prop: 'serie',
            name: 'Serie'
        },
        {
            prop: 'tipo_empaque.nombre',
            name: 'Tipo Empaque'
        },
        {
            prop: 'clase.nombre',
            name: 'Clase'
        },
        {
            prop: 'modelo.nombre',
            name: 'Modelo'
        },
        {
            prop: 'estado.nombre',
            name: 'Estado'
        },
        {
            prop: 'ubicacion.__str__',
            name: 'Ubicacion'
        },
        {
            prop: 'custodio.__str__',
            name: 'Custodio'
        },
    ];

    constructor(private empaqueService: EmpaquesService,
                private tipoEmpaqueService: TipoEmpaquesService,
                private ubicacionesService: UbicacionesService,
                private clasesService: ClasesService,
                private loginService: LoginService,
                private papa: Papa,
                private excelService:ExcelService,
                ) { }

    ngOnInit() {
        this.empaqueService.getEmpaques().subscribe(
            empaques => {
                this.rows = empaques;
                this.empaques = empaques;
            },
            err => console.log('error: ' + err.status)
        );

        this.tipoEmpaqueService.getTipoEmpaques().subscribe(
            // tipos_empaques => this.tipo_empaques = tipo_empaques,
            tipo_empaques => {
                this.tipo_empaques = tipo_empaques;
            },
            err => console.log('error: ' + err.status)
        );

        this.ubicacionesService.getUbicaciones().subscribe(
            ubicaciones => this.ubicaciones = ubicaciones,
            err => console.log('error: ' + err.status)
        );

        this.clasesService.getClases().subscribe(
            clases => this.clases = clases,
            err => console.log('error: ' + err.status)
        );

        this.loginService.isLoged('OP');

    }

    filtrar_tipo(id) {
        if (id === 'TODO') {
            this.rows = this.empaques;
        } else {
            this.rows = this.empaques.filter(
                empaque => empaque.tipo_empaque.id === id
            );
        }
    }

    filtrar_ubicacion(id) {
        if (id === 'TODO') {
            this.rows = this.empaques;
        } else {
            this.rows = this.empaques.filter(
                empaque => empaque.ubicacion.id === id
            );
        }
    }

    filtrar_clase(id) {
        if (id === 'TODO') {
            this.rows = this.empaques;
        } else {
            this.rows = this.empaques.filter(
                empaque => empaque.clase.id === id
            );
        }
    }

    onSelect({ selected }) {
      this.selected.splice(0, this.selected.length);
      this.selected.push(...selected);
    }

    onActivate(event) {}

    updateFilter(event) {
        const val = event.target.value.toLowerCase();
    
        // filter our data
        const temp = this.empaques.filter(function(d) {
          return d.__str__.toLowerCase().indexOf(val) !== -1 || !val;
        });
    
        // update the rows
        this.rows = temp;
        // Whenever the filter changes, always go back to the first page
        this.table.offset = 0;
    }

    test = [];
    data_multiple = [];
    handleFileSelect(evt) {
      var files = evt.target.files; // FileList object
      var file = files[0];
      var reader = new FileReader();
      reader.readAsText(file);
      reader.onload = (event: any) => {
        var csv = event.target.result; // Content of CSV file
        this.papa.parse(csv, {
          skipEmptyLines: true,
          header: true,
          complete: (results) => {
            for (let i = 0; i < results.data.length; i++) {
              let empaquesDetails = {
                bodega: results.data[i].bodega,
                clase: results.data[i].clase,
                codigo: results.data[i].codigo,
                custodio: results.data[i].custodio,
                estado: results.data[i].estado,
                serie: results.data[i].serie,
              };
             this.test.push(empaquesDetails);
            }
            // console.log(this.test);
            console.log('Parsed: k', results.data);
            this.data_multiple = results.data;
          }
        });
      }
    }

    addEmpaques() {
        this.empaqueService.addMultipleEmpaques(this.data_multiple).subscribe(
            response => {
                swal(
                    'Creado',
                    'El empaque fue creado con éxito.',
                    'success'
                );
                this.empaqueService.getEmpaques().subscribe(
                    empaques => {
                        this.rows = empaques;
                        this.empaques = empaques;
                    },
                    err => console.log('error: ' + err.status)
                );        
                this.modal.hide();
            },
            err => {
                console.log(err)
                swal(
                    'Error',
                    'Error al crear cilindros con archivo.' + err.error,
                    'error'
                );
                this.modal.hide();
            }
        );
    }

    export() {
        let data = [];
        for (let row of this.rows) {
            let obj = {
                "nombre": row.__str__,
                "codigo": row.codigo,
                "clase": row.clase.nombre,
                "serie": row.serie,
                "estado": row.estado.nombre,
                "ubicacion": row.ubicacion.__str__,
                "empresa_custodio": row.custodio.representante.empresa.nombre,
                "custodio": row.custodio.__str__
            }
            data.push(obj);
        }
        this.excelService.exportAsExcelFile(data, 'datos_empaques');
      }
}
