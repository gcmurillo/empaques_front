import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { transition, trigger, style, animate } from '@angular/animations';
import swal from 'sweetalert2';
import {NgbCalendar, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';


import { Empaque, EmpaqueDetail } from '../../../shared/empaque/empaque';
import { Orden, TransaccionCreate, OrdenEmpaqueDetailCreate } from '../../../shared/orden/orden';

import { TransaccionesService } from '../../../services/transacciones/transacciones.service';
import { UbicacionesService } from '../../../services/ubicaciones/ubicaciones.service';
import { CustodiosService } from '../../../services/custodios/custodios.service';
import { EstadosService } from '../../../services/estados/estados.service';
import { EmpaquesService } from '../../../services/empaques/empaques.service';
import { LoginService } from '../../../services/login/login.service';

@Component({
    selector: 'app-transacciones-create',
    templateUrl: './transacciones-create.component.html',
    styleUrls: ['./transacciones-create.component.scss',
        '../../../../assets/icon/icofont/css/icofont.scss'
    ]
})
export class TransaccionesCreateComponent implements OnInit {

    bodegas = [];
    estados_disp = [];
    empaques_get = [];
    selected = [];
    custodios = [];
    ubicaciones = [];
    bodega_selected = localStorage.getItem('bodega');
    ordenesEmpaques = [];
    transacciones_list = [];

    transaccion_object = new TransaccionCreate;
    ordenEmpaque_object = new OrdenEmpaqueDetailCreate;

    transaccionForm = new FormGroup(
        {
            nombre: new FormControl(''),
            descripcion: new FormControl(''),
            // bodega: new FormControl(''),
            fecha_inicio: new FormControl(''),
            dias_plazo: new FormControl('30'),
            nuevo_custodio: new FormControl(''),
        }
    );

    constructor(
        private ubicacionesService: UbicacionesService,
        public parserFormatter: NgbDateParserFormatter,
        public calendar: NgbCalendar,
        public empaquesService: EmpaquesService,
        public custodioService: CustodiosService,
        public transaccionService: TransaccionesService,
        private router: Router,
        private loginService: LoginService,
    ) { }

    ngOnInit() {
        this.ubicacionesService.getUbicaciones().subscribe(
            ubicaciones => {
                const id_bodegas = [];
                const id_estados = [];
                for (const ubi of ubicaciones) {
                    if (!id_bodegas.includes(ubi.bodega.id)) {
                        this.bodegas.push(ubi.bodega);
                        id_bodegas.push(ubi.bodega.id);
                    }
                    if (!id_estados.includes(ubi.estado_disp.id)) {
                        this.estados_disp.push(ubi.estado_disp);
                        id_estados.push(ubi.estado_disp.id);
                    }
                }
                this.ubicaciones = ubicaciones;
            },
            err => console.log('error: ' + err.status)
        );

        this.custodioService.getCustodios().subscribe(
            custodios => this.custodios = custodios,
            err => console.log('error: ' + err.status)
        );

        this.loginService.isLoged('CO');
    }

    disabledSecondPage() {
        if (// this.transaccionForm.value.bodega !== '' &&
            this.transaccionForm.value.fecha_inicio !== '' &&
            this.transaccionForm.value.dias_plazo !== '' &&
            this.transaccionForm.value.nombre !== '' &&
            this.transaccionForm.value.nuevo_custodio !== ''
        ) {
            return false;
        } else {
            return true;
        }
    }

    disabledThirdPage() {
        if (this.selected.length === 0) {
            return true;
        } else {
            return false;
        }
    }

    second_page() {
        this.selected = [];
        const bodega = this.transaccionForm.value.bodega !== '' ? this.transaccionForm.value.bodega : null;
        const fecha_inicio = this.transaccionForm.value.fecha_inicio;
        const dias_plazo = this.transaccionForm.value.dias_plazo;
        if (fecha_inicio !== '' && dias_plazo !== '') {
            const query = '?bodega=' + bodega + '&estado=1&estado_disp=1';
            /*this.empaquesService.getEmpaquebyQuery(query).subscribe(
                empaques => this.empaques_get = empaques,
                err => console.log('error: ' + err.status)
            );*/
            this.empaquesService.getEmpaquesDisponibles().subscribe(
                empaques => {
                    this.empaques_get = empaques.filter(emp => emp.ubicacion.bodega.nombre === this.bodega_selected);
                    console.log(this.empaques_get);
                },
                err => console.log(err)
            );
        } else {
            console.log('no pasa');
        }
    }

    third_page() {
        this.transaccion_object.tipo = 1;
        this.transaccion_object.nombre = this.transaccionForm.value.nombre;
        this.transaccion_object.descripcion = this.transaccionForm.value.descripcion;
        this.transaccion_object.dias_plazo = this.transaccionForm.value.dias_plazo;
        const fecha = this.transaccionForm.value.fecha_inicio.year + '-'
                    + this.transaccionForm.value.fecha_inicio.month + '-'
                    + this.transaccionForm.value.fecha_inicio.day;
        this.transaccion_object.fecha_inicio = fecha;
        this.transaccion_object.nuevo_custodio = +this.transaccionForm.value.nuevo_custodio;
        const ubicacion_inicial = this.ubicaciones.filter(
            ubicacion => ubicacion.bodega.nombre === this.bodega_selected &&
                         ubicacion.estado_disp.id === 1
        )[0];
        const nueva_ubicacion = this.ubicaciones.filter(
            ubicacion => ubicacion.bodega.nombre === this.bodega_selected &&
                         ubicacion.estado_disp.id === 3
        )[0];
        this.transaccion_object.ubicacion_inicial = ubicacion_inicial.id;
        this.transaccion_object.nueva_ubicacion = nueva_ubicacion.id;
        console.log(this.transaccion_object);

    }

    postTransaccion() {
        this.transaccionService.createTransaccion(this.transaccion_object).subscribe(
            data => {
                swal(
                    'Creado',
                    'Transaccion creada con éxito.',
                    'success'
                );
                console.log(data);
                this.transacciones_list = [];
                this.transaccionService.getTransaccionesTODAS().subscribe(
                    transacciones => {
                        this.transacciones_list = transacciones;
                        this.ordenEmpaque_object = new OrdenEmpaqueDetailCreate;
                        for (const select of this.selected) {
                            this.ordenEmpaque_object.orden = this.transacciones_list[this.transacciones_list.length - 1].id;
                            this.ordenEmpaque_object.empaque = select.codigo;
                            this.ordenEmpaque_object.aprobado = false;
                            this.ordenEmpaque_object.entregado = false;
                            this.transaccionService.createOrdenEmpaque(this.ordenEmpaque_object).subscribe(
                                response => {
                                    console.log(response);
                                },
                                err => console.log('error post:', err)
                            );
                        }
                    },
                    err => console.log('error: ' + err.status)
                    // this.router.navigate(['/transacciones']);
                );
                this.router.navigate(['/transacciones/no-desp']);
            },
            err => {
                console.log('error post:');
                console.log(err);
                swal(
                    'Cancelado',
                    'La transaccion no fue creado' + err.status,
                    'error'
                );
                this.router.navigate(['/transacciones/create']);
            }
        );
    }

    onSelect({ selected }) {
      this.selected.splice(0, this.selected.length);
      this.selected.push(...selected);
    }

    onActivate(event) {}


}
