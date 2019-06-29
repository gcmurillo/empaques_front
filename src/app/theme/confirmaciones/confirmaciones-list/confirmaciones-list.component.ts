import { Component, OnInit } from '@angular/core';
import { TransaccionesService } from '../../../services/transacciones/transacciones.service';
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

  constructor(private transaccionService: TransaccionesService,
              ) { }

  ngOnInit() {
    this.transaccionService.getOrdenesEmpaques().subscribe(
      ordenes => { 
        this.rows = ordenes;
        console.log(ordenes);
      },
      err => console.log('error: ' + err.status)
    );

    this.transaccionService.getTransacciones().subscribe(
      transacciones => this.transacciones = transacciones,    
      err => console.log('error: ' + err.status)
    );

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
        this.transaccionService.getTransacciones().subscribe(
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
        this.transaccionService.getTransacciones().subscribe(
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

}
