import { Component, OnInit, ViewChild } from '@angular/core';
import { Orden } from '../../../shared/orden/orden';
import { TransaccionesService } from '../../../services/transacciones/transacciones.service';
import { UbicacionesService } from '../../../services/ubicaciones/ubicaciones.service';
import { LoginService } from '../../../services/login/login.service';
import { ExcelService } from '../../../services/excel/excel.service';
import { CustodiosService } from '../../../services/custodios/custodios.service';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
    selector: 'app-ordenes-reporte',
    templateUrl: './ordenes-reporte.component.html',
    styleUrls: [
        '../../../../assets/icon/icofont/css/icofont.scss',
    ]
})
export class OrdenesReporteComponent implements OnInit {

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
    custodios = [];

    filtroForm = new FormGroup(
      {
        tipo: new FormControl(''),
        completo: new FormControl(''),
        nuevo_custodio: new FormControl(''),
        fecha_inicio_desde: new FormControl(),
        fecha_inicio_hasta: new FormControl(),
        fecha_despacho_desde: new FormControl(),
        fecha_despacho_hasta: new FormControl(),
        fecha_retorno_desde: new FormControl(),
        fecha_retorno_hasta: new FormControl(),
      }
    )

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
                private custodioService: CustodiosService,
            ) { }

    ngOnInit() {

        this.transaccionService.getOrdenesEmpaquesFiltro('').subscribe(
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

        this.custodioService.getCustodios().subscribe(
          custodios => {
            this.custodios = custodios;
          },
          err => console.log('error: ' + err.status)
        );

        this.loginService.isLoged('CO');
    }

    consultar() {
      console.log(this.filtroForm.value);
      let query = '?';
      query += 'tipo=' + this.filtroForm.value.tipo;
      query += '&completo=' + this.filtroForm.value.completo;
      query += '&nuevo_custodio=' + this.filtroForm.value.nuevo_custodio;
      if (this.filtroForm.value.fecha_inicio_desde) {
        let f = this.filtroForm.value.fecha_inicio_desde.year + '-' 
              + this.filtroForm.value.fecha_inicio_desde.month + '-'
              + this.filtroForm.value.fecha_inicio_desde.day;
        query += '&min_fecha_inicio=' + f;
      }
      if (this.filtroForm.value.fecha_inicio_hasta) {
        let f = this.filtroForm.value.fecha_inicio_hasta.year + '-' 
              + this.filtroForm.value.fecha_inicio_hasta.month + '-'
              + this.filtroForm.value.fecha_inicio_hasta.day;
        query += '&max_fecha_inicio=' + f;
      }
      if (this.filtroForm.value.fecha_despacho_desde) {
        let f = this.filtroForm.value.fecha_despacho_desde.year + '-' 
              + this.filtroForm.value.fecha_despacho_desde.month + '-'
              + this.filtroForm.value.fecha_despacho_desde.day;
        query += '&min_fecha_despacho=' + f;
      }
      if (this.filtroForm.value.fecha_despacho_hasta) {
        let f = this.filtroForm.value.fecha_despacho_hasta.year + '-' 
              + this.filtroForm.value.fecha_despacho_hasta.month + '-'
              + this.filtroForm.value.fecha_despacho_hasta.day;
        query += '&max_fecha_despacho=' + f;
      }
      if (this.filtroForm.value.fecha_retorno_desde) {
        let f = this.filtroForm.value.fecha_retorno_desde.year + '-' 
              + this.filtroForm.value.fecha_retorno_desde.month + '-'
              + this.filtroForm.value.fecha_retorno_desde.day;
        query += '&min_fecha_retorno=' + f;
      }
      if (this.filtroForm.value.fecha_retorno_hasta) {
        let f = this.filtroForm.value.fecha_retorno_hasta.year + '-' 
              + this.filtroForm.value.fecha_retorno_hasta.month + '-'
              + this.filtroForm.value.fecha_retorno_hasta.day;
        query += '&max_fecha_retorno=' + f;
      }
      this.transaccionService.getOrdenesEmpaquesFiltro(query).subscribe(
          transacciones => {
              this.rows = transacciones;
              this.transacciones = transacciones;
              console.log("consultar");
          },    
          err => console.log('error: ' + err.status)
        );
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
      this.excelService.exportAsExcelFile(data, 'reporte-ordenes');
    }

}
