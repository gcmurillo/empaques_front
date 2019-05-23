import { Component, OnInit } from '@angular/core';
import { Orden } from '../../../shared/orden/orden';
import { TransaccionesService } from '../../../services/transacciones/transacciones.service';

@Component({
    selector: 'app-transacciones-list',
    templateUrl: './transacciones-list.component.html',
    styleUrls: ['./transacciones-list.component.scss']
})
export class TransaccionesListComponent implements OnInit {

    rows = [];
    selected = [];
    transacciones = [];

    constructor(private transaccionService: TransaccionesService) { }

    ngOnInit() {
        this.transaccionService.getTransacciones().subscribe(
            transacciones => {
                this.rows = transacciones;
                this.transacciones = transacciones;
                console.log(transacciones);
            },
            err => console.log('error: ' + err.status)
        );
    }

}
