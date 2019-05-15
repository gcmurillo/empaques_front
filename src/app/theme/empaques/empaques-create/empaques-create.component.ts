import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { transition, trigger, style, animate } from '@angular/animations';
import swal from 'sweetalert2';

// interfaces
import { Empaque, EmpaqueDetail } from '../../../shared/empaque/empaque';
import { TipoEmpaque } from '../../../shared/tipo_empaque/tipo_empaque';
import { Marca } from '../../../shared/marca/marca';

// services
import { EmpaquesService } from '../../../services/empaques/empaques.service';
import { TipoEmpaquesService } from '../../../services/tipo_empaques/tipo_empaques.service';
import { UbicacionesService } from '../../../services/ubicaciones/ubicaciones.service';
import { ClasesService } from '../../../services/clases/clases.service';
import { MarcasService } from '../../../services/marcas/marcas.service';
import { ModelosService } from '../../../services/modelos/modelos.service';
import { EstadosService } from '../../../services/estados/estados.service';
import { CustodiosService } from '../../../services/custodios/custodios.service';


@Component({
    selector: 'app-empaques-create',
    templateUrl: './empaques-create.component.html',
    styleUrls: ['./empaques-create.component.scss',
        '../../../../assets/icon/icofont/css/icofont.scss']
})
export class EmpaquesCreateComponent implements OnInit {

    // listas para elementos del api
    empaques = [];
    tipo_empaques = [];
    ubicaciones = [];
    clases = [];
    marcas: Marca[] = [];
    modelos = [];
    estados_empaques = [];
    custodios = [];
    empaque_object = new Empaque;
    nombre_marcas: Marca[] = [];

    // forms elements
    empaqueForm = new FormGroup(
        {
            codigo: new FormControl(''),
            codigo_barras: new FormControl(''),
            serie: new FormControl(''),
            tipo_empaque: new FormControl(''),
            marca: new FormControl(''),
            clase: new FormControl(''),
            modelo: new FormControl(''),
            estado: new FormControl(''),
            ubicacion: new FormControl(''),
            custodio: new FormControl(''),
            precio: new FormControl(''),
            costo: new FormControl(''),
        }
    );


    constructor(private empaqueService: EmpaquesService,
        private tipoEmpaqueService: TipoEmpaquesService,
        private ubicacionesService: UbicacionesService,
        private clasesService: ClasesService,
        private marcasService: MarcasService,
        private modelosService: ModelosService,
        private estadosService: EstadosService,
        private custodioService: CustodiosService,
    ) { }

    ngOnInit() {
        this.clasesService.getClases().subscribe(
            clases => this.clases = clases,
            err => console.log('error: ' + err.status)
        );

        this.marcasService.getMarcas().subscribe(
            marcas => this.marcas = marcas,
            err => console.log('error: ' + err.status)
        );

        this.modelosService.getModelos().subscribe(
            modelos => this.modelos = modelos,
            err => console.log('error: ' + err.status)
        );

        this.estadosService.getEstadosEmpaques().subscribe(
            estados => this.estados_empaques = estados,
            err => console.log('error: ' + err.status)
        );

        this.tipoEmpaqueService.getTipoEmpaques().subscribe(
            // tipos_empaques => this.tipo_empaques = tipo_empaques,
            tipo_empaques => {
                this.tipo_empaques = tipo_empaques;
            },
            err => console.log('error: ' + err.status)
        );

        this.ubicacionesService.getUbicaciones().subscribe(
            ubicaciones => this.ubicaciones = ubicaciones,
            err => console.log('error: ' + err.status)
        );

        this.custodioService.getCustodios().subscribe(
            custodios => this.custodios = custodios,
            err => console.log('error: ' + err.status)
        );
    }

    onSubmit() {

        this.empaque_object.codigo = this.empaqueForm.value.codigo !== '' ? this.empaqueForm.value.codigo : null;
        this.empaque_object.codigo_barras = this.empaqueForm.value.codigo_barras !== '' ? this.empaqueForm.value.codigo_barras : null;
        this.empaque_object.serie = this.empaqueForm.value.serie !== '' ? this.empaqueForm.value.serie : null;
        this.empaque_object.tipo_empaque = this.empaqueForm.value.tipo_empaque !== '' ? +this.empaqueForm.value.tipo_empaque : null;
        this.empaque_object.marca = this.empaqueForm.value.marca !== '' ? +this.empaqueForm.value.marca : null;
        this.empaque_object.clase = this.empaqueForm.value.clase !== '' ? +this.empaqueForm.value.clase : null;
        this.empaque_object.modelo = this.empaqueForm.value.modelo !== '' ? +this.empaqueForm.value.modelo : null;
        this.empaque_object.estado = this.empaqueForm.value.estado !== '' ? +this.empaqueForm.value.estado : null;
        this.empaque_object.ubicacion = this.empaqueForm.value.ubicacion !== '' ? +this.empaqueForm.value.ubicacion : null;
        this.empaque_object.custodio = this.empaqueForm.value.custodio !== '' ? +this.empaqueForm.value.custodio : null;
        this.empaque_object.costo = this.empaqueForm.value.costo !== '' ? +this.empaqueForm.value.costo : null;
        this.empaque_object.precio = this.empaqueForm.value.precio !== '' ? +this.empaqueForm.value.precio : null;
        console.log('Empaque: ', this.empaque_object);

        this.empaqueService.addEmpaque(this.empaque_object).subscribe(
            data => {
                swal(
                    'Creado',
                    'El empaque fue creado con éxito.',
                    'success'
                );
                console.log(data);
            },
            err => {
                console.log('error post:');
                console.log(err);
                swal(
                    'Cancelado',
                    'El empaque no fue creado',
                    'error'
                );
            }
        );

    }

    guardarModal() {
        swal({
            title: 'Crear empaque',
            text: 'Desea crear empaque?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Crear',
            cancelButtonText: 'Cancelar',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger mr-sm'
        }).then((result) => {
            if (result.value) {
                this.onSubmit();
            } else if (result.dismiss) {
                swal(
                    'Cancelado',
                    'El empaque no fue creado',
                    'error'
                );
            }
        });
    }

    openCrearMarca() {
        const marca_crear = new Marca;
        swal({
            title: 'Crear nueva marca',
            input: 'text',
            showCancelButton: true,
            confirmButtonText: 'Crear',
            showLoaderOnConfirm: true,
            preConfirm: (nombre_marca) => {
                marca_crear.nombre = nombre_marca;
                console.log(marca_crear);
                this.marcasService.addMarca(marca_crear).subscribe(
                    data => {
                        swal(
                            'Creado',
                            'El empaque fue creado con éxito.',
                            'success'
                        );
                        console.log(data);
                        this.marcasService.getMarcas().subscribe(
                            marcas => this.marcas = marcas,
                            err => console.log('error: ' + err.status)
                        );
                    },
                    err => {
                        console.log('error post:');
                        console.log(err);
                        swal({
                            type: 'error',
                            title: 'Error al crear',
                        });
                    }
                );
            },
            allowOutsideClick: () => !swal.isLoading()
        });
    }

}
