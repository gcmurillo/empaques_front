import { Component, OnInit, ViewChild } from '@angular/core';
import { TransaccionesService } from '../../../services/transacciones/transacciones.service';
import { LoginService } from '../../../services/login/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-confirmaciones-list',
  templateUrl: './confirmaciones-list.component.html',
  styleUrls: [
    './confirmaciones-list.component.scss',
    '../../../../assets/icon/icofont/css/icofont.scss'
  ]
})
export class ConfirmacionesListComponent implements OnInit {

  ordenes = [];
  rows = [];

  transacciones = [];
  transacciones_total = [];

  empaques_messages = {
    emptyMessage: "Sin empaques que aprobar",
    totalMessage: " Empaques"
  }

  ordenes_messages = {
    emptyMessage: "Sin ordenes que despachar",
    totalMessage: " Ordenes"
  }

  @ViewChild('empaques') tablaEmpaques: any;
  @ViewChild('ordenes') tablaOrdenes: any;

  constructor(private transaccionService: TransaccionesService,
              private loginService: LoginService,
              ) { }

  ngOnInit() {
    this.transaccionService.getOrdenesEmpaques().subscribe(
      ordenes => { 
        this.rows = ordenes.filter(row => row.empaque.ubicacion.bodega.nombre === localStorage.getItem('bodega'));
        this.ordenes = this.rows;
        console.log(ordenes);
      },
      err => console.log('error: ' + err.status)
    );

    this.transaccionService.getTransaccionesNoDespachadas().subscribe(
      transacciones => {
        this.transacciones = transacciones.filter(row => row.ubicacion_inicial.bodega.nombre === localStorage.getItem('bodega'));
        this.transacciones_total = this.transacciones;
      },    
      err => console.log('error: ' + err.status)
    );
    
    this.loginService.isLoged('OP');

  }

  setAprobacion(row, value) {
    const data = {
      "orden": row.orden.id,
      "empaque": row.empaque.codigo,
      "aprobado": value,
      "entregado": row.entregado
    }
    this.transaccionService.editOrdenEmpaque(data, row.id).subscribe(
      response => {
        console.log(response)
        this.transaccionService.getOrdenesEmpaques().subscribe(
          ordenes => { 
            this.rows = ordenes;
          },
          err => console.log('error: ' + err.status)
        );
        this.transaccionService.getTransaccionesNoDespachadas().subscribe(
          transacciones => this.transacciones = transacciones,    
          err => console.log('error: ' + err.status)
        );
      },
      err => console.log(err)
    );
  }

  setDespachado(row, value) {
    const data = {
      "tipo": row.tipo.id,
      "despachado": value,
      "ubicacion_inicial": row.ubicacion_inicial.id
    }
    this.transaccionService.despacharOrden(data, row.id).subscribe(
      response => {
        swal(
          'Despachado',
          'La orden fue despachada con éxito.',
          'success'
        );
        this.transaccionService.getOrdenesEmpaques().subscribe(
          ordenes => { 
            this.rows = ordenes;
          },
          err => console.log('error: ' + err.status)
        );
        this.transaccionService.getTransaccionesNoDespachadas().subscribe(
          transacciones => this.transacciones = transacciones,    
          err => console.log('error: ' + err.status)
        );
      },
      err => {
        swal(
          'No Despachado',
          'Para despachar, tiene que aprobar sus empaques.',
          'error'
        );
      }
    );
  }

  onActivate(event) {}

  empaquesFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.ordenes.filter(function(d) {
      return d.empaque.__str__.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.tablaEmpaques.offset = 0;
  }

  ordenesFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.transacciones_total.filter(function(d) {
      return d.nombre.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.transacciones = temp;
    // Whenever the filter changes, always go back to the first page
    this.tablaOrdenes.offset = 0;
  }

}
