import { Component, OnInit } from '@angular/core';
import { TransaccionesService } from '../../../services/transacciones/transacciones.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-retornos-list',
  templateUrl: './retornos-list.component.html',
  styleUrls: [
    '../../../../assets/icon/icofont/css/icofont.scss'
  ]
})
export class RetornosListComponent implements OnInit {

  ordenes = [];
  rows = [];

  transacciones = [];

  empaques_messages = {
    emptyMessage: "Sin empaques que aprobar",
    totalMessage: " Empaques"
  }

  ordenes_messages = {
    emptyMessage: "Sin ordenes que despachar",
    totalMessage: " Ordenes"
  }

  constructor(private transaccionService: TransaccionesService,
              ) { }

  ngOnInit() {
    this.transaccionService.getOrdenesEmpaquesPorEntregar().subscribe(
      ordenes => { 
        this.rows = ordenes;
      },
      err => console.log('error: ' + err.status)
    );

  }

  setRetorno(row, value) {
    const data = {
      "orden": row.orden.id,
      "empaque": row.empaque.codigo,
      "aprobado": row.aprobado,
      "entregado": value
    }
    this.transaccionService.editOrdenEmpaque(data, row.id).subscribe(
      response => {
        console.log(response)
        this.transaccionService.getOrdenesEmpaquesPorEntregar().subscribe(
          ordenes => { 
            this.rows = ordenes;
          },
          err => console.log('error: ' + err.status)
        );
      },
      err => console.log(err)
    );
  }

  onActivate(event) {}

}
