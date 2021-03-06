import { Component, OnInit, ViewChild } from '@angular/core';
import { TransaccionesService } from '../../../services/transacciones/transacciones.service';
import { LoginService } from '../../../services/login/login.service';
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

  @ViewChild('tablaretornos') tablaEmpaques: any;

  constructor(private transaccionService: TransaccionesService,
              private loginService: LoginService,
              ) { }

  ngOnInit() {
    this.transaccionService.getOrdenesEmpaquesPorEntregar().subscribe(
      ordenes => { 
        this.rows = ordenes;
        this.ordenes = ordenes;
      },
      err => console.log('error: ' + err.status)
    );

    this.loginService.isLoged('OP');
  }

  setRetorno(row, value, obs) {
    const data = {
      "orden": row.orden.id,
      "empaque": row.empaque.codigo,
      "aprobado": row.aprobado,
      "entregado": value,
      "observacion_retorno": obs
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

  openRetornoPop(row, value) {
    swal({
        title: 'Observacion de retorno',
        input: 'text',
        showCancelButton: true,
        confirmButtonText: 'Aprobar retorno',
        showLoaderOnConfirm: true,
        preConfirm: (observacion) => {
            this.setRetorno(row, value, observacion);
        },
        allowOutsideClick: () => !swal.isLoading()
    });
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

}
