import { Component, OnInit } from '@angular/core';
import { TransaccionesService } from '../../../services/transacciones/transacciones.service';

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

  onActivate(event) {}

}
