import { Component, OnInit, ViewChild } from '@angular/core';
import { Orden } from '../../../shared/orden/orden';
import { TransaccionesService } from '../../../services/transacciones/transacciones.service';
import { UbicacionesService } from '../../../services/ubicaciones/ubicaciones.service';
import { LoginService } from '../../../services/login/login.service';


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

}
