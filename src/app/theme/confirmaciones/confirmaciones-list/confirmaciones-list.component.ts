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

  columns: any[] = [
    {
      prop: 'orden.__str__',
      name: 'Nombre Orden'
    },
    {
      prop: 'orden.ubicacion_inicial.bodega.nombre',
      name: 'Bodega'
    },
    {
      prop: 'empaque.codigo',
      name: 'Codigo Empaque'
    },
    {
      prop: 'empaque.tipo_empaque.nombre',
      name: 'Tipo empaque'
    }
  ]

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
  }

  onActivate(event) {}

}
