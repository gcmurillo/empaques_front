import { Component, OnInit } from '@angular/core';
import { Orden } from '../../../shared/orden/orden';
import { TransaccionesService } from '../../../services/transacciones/transacciones.service';
import { UbicacionesService } from '../../../services/ubicaciones/ubicaciones.service';

@Component({
    selector: 'app-transacciones-list',
    templateUrl: './transacciones-list.component.html',
    styleUrls: ['./transacciones-list.component.scss',
        '../../../../assets/icon/icofont/css/icofont.scss'
    ]
})
export class TransaccionesListComponent implements OnInit {

    rows = [];
    selected = [];
    transacciones = [];
    bodegas = [];

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
            ) { }

    ngOnInit() {
        this.transaccionService.getTransacciones().subscribe(
            transacciones => {
                this.rows = transacciones;
                this.transacciones = transacciones;
                console.log(transacciones);
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

}
