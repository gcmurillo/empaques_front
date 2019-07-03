import { OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup , Validators} from '@angular/forms';
import { transition, trigger, style, animate } from '@angular/animations';
import swal from 'sweetalert2';
import {IOption} from 'ng-select'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/first';


// interfaces
import { Empresa, EmpresaCreate } from '../../../shared/empresa/empresa';
import { RepresentanteCreate } from '../../../shared/representante/representante';
import { VendedorCreate } from '../../../shared/vendedor/vendedor';
import { CustodioCreate, Correo } from '../../../shared/custodio/custodio';

// services
import { CustodiosService } from '../../../services/custodios/custodios.service';
import { LoginService } from '../../../services/login/login.service';


@Component({
    selector: 'app-custodios-create',
    templateUrl: './custodios-create.component.html',
    styleUrls: ['../../../../assets/icon/icofont/css/icofont.scss']
})
export class CustodiosCreateComponent implements OnInit {

    // listas para elementos del api
    representantes = [];
    vendedores = [];
    empresas = []
    err_empresa = [];
    correos = [];
    correos_selected: Array<Correo> = [];

    // forms elements
    custodioForm = new FormGroup(
        {
            representante: new FormControl('', [Validators.required]),
            vendedor: new FormControl('', Validators.required),
        }
    );
    
    repreForm = new FormGroup(
        {
            cedula: new FormControl('', [Validators.required, Validators.pattern('[\\d]{10}')]),
            nombre: new FormControl('', [Validators.required, Validators.pattern('[\\w\\W]+')]),
            nombre_carta: new FormControl(''),
            telefono: new FormControl('', [Validators.minLength(6), Validators.pattern('[\\d]+')]),
            empresa: new FormControl('', Validators.required),
        }
    );

    vendedorForm = new FormGroup(
        {
            nombre: new FormControl('', [Validators.required]),
            cedula: new FormControl('', [Validators.required, Validators.pattern('^[\\d]{10}$')]),
        }
    )

    constructor(
        private custodioService: CustodiosService,
        private router: Router,
        private loginService: LoginService,
    ) { }

    ngOnInit() {
        this.custodioService.getRepresentantes().subscribe(
            repres => {
                this.representantes = repres;
                console.log(repres);
            },
            err => console.log(err)
        );

        this.custodioService.getVendedores().subscribe(
            vendedores => this.vendedores = vendedores,
            err => console.log(err)
        );

        this.custodioService.getEmpresas().subscribe(
            empresas => this.empresas = empresas,
            err => console.log(err)
        );

        this.custodioService.getCorreos().subscribe(
            correos => this.correos = correos,
            err => console.log(err)
        );

        this.loginService.isLoged('CO');
    }

    onSubmit() {

        const custodio = new CustodioCreate;
        custodio.representante = this.custodioForm.value.representante;
        custodio.vendedor = this.custodioForm.value.vendedor;
        console.log(custodio);

        this.custodioService.addCustodio(custodio).subscribe(
            data => {
                swal(
                    'Creado',
                    'El custodio fue creado con éxito.',
                    'success'
                );
                this.router.navigate(['/custodios']);
            },
            err => {
                console.log('error post:');
                console.log(err);
                swal(
                    'Cancelado',
                    'El representante no fue creado',
                    'error'
                );
            }
        )
    }

    guardarCustodioModal() {
        if (this.custodioForm.valid) {
            swal.resetDefaults();
            swal({
                title: 'Crear custodio',
                text: 'Desea crear custodio?',
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
                        'El custodio no fue creado',
                        'error'
                    );
                }
            });
        }
    }
    
    crearRepresentante() {
        
        const repre_obj = new RepresentanteCreate;
        repre_obj.cedula = this.repreForm.value.cedula;
        repre_obj.nombre = this.repreForm.value.nombre;
        repre_obj.nombre_carta = this.repreForm.value.nombre_carta;
        repre_obj.telefono = this.repreForm.value.telefono;
        repre_obj.empresa = this.repreForm.value.empresa;
        const corr_ids = [];
        for (let corr of this.correos_selected) {
            corr_ids.push(corr.id);
        }
        repre_obj.correos = corr_ids;

        this.custodioService.addRepre(repre_obj).subscribe(
            data => {
                swal(
                    'Creado',
                    'El representante fue creado con éxito.',
                    'success'
                );
                this.custodioService.getRepresentantes().subscribe(
                    repres => {
                        this.representantes = repres;
                        console.log(repres);
                    },
                    err => console.log(err)
                );
            },
            err => {
                console.log('error post:');
                console.log(err);
                swal(
                    'Cancelado',
                    'El representante no fue creado',
                    'error'
                );
            }
        );
    }

    guardarRepresentanteModal() {
        if (this.repreForm.valid) {
            swal.resetDefaults();
            swal({
                title: 'Crear representante',
                text: 'Desea crear representante de empresa?',
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
                    this.crearRepresentante()
                } else if (result.dismiss) {
                    swal(
                        'Cancelado',
                        'El representante no fue creado',
                        'error'
                    );
                }
            });
        }
    }

    openCrearEmpresa() {
        swal.resetDefaults();
        swal.setDefaults({
          input: 'text',
          confirmButtonText: 'Siguiente &rarr;',
          showCancelButton: true,
          progressSteps: ['1', '2', '3', '4', '5']
        });
    
        const steps = [
          {
            title: 'Codigo',
            text: 'Asignar codigo a la empresa'
          },
          'Nombre',
          {
            title: 'RUC',
            text: 'RUC de la empresa'
          },
          'Direccion',
          'Telefono',
        ];
    
        swal.queue(steps).then((data) => {
          
          if (data.value) {
            swal.resetDefaults();
            swal({
              title: 'All done!',
              html:
              'Your answers: <pre>' +
              JSON.stringify(data.value) +
              '</pre>',
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Crear empresa',
              cancelButtonText: 'Cancelar',
              confirmButtonClass: 'btn btn-success',
              cancelButtonClass: 'btn btn-danger mr-sm',
              showCancelButton: true
            }).then((result) => {
                if (result.value) {
                    console.log('CREAR EMPRESA');
                    const empresa_obj = new EmpresaCreate;
                    empresa_obj.codigo = data.value[0];
                    empresa_obj.nombre = data.value[1];
                    empresa_obj.RUC = data.value[2];
                    empresa_obj.direccion = data.value[3];
                    empresa_obj.telefono = data.value[4];
                    console.log(empresa_obj);
                    this.custodioService.addEmpresa(empresa_obj).subscribe(
                        data => {
                            swal(
                                'Creado',
                                'La empresa fue creada con éxito.',
                                'success'
                            );
                            console.log(data);
                            this.custodioService.getEmpresas().subscribe(
                                empresas => this.empresas = empresas,
                                err => console.log(err)
                            );
                        },
                        err => {
                            console.log('error post:');
                            console.log(err);
                            this.err_empresa = err;
                            /*swal(
                                'Cancelado',
                                'La empresa no fue creada',
                                'error'
                            );*/
                            swal({
                                title: 'Cancelado',
                                html:
                                'Tus errores: <pre>' +
                                JSON.stringify(err.error) +
                                '</pre>', 
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: 'Aceptar',
                                confirmButtonClass: 'btn btn-success',
                            });
                        }
                    );
                } else if (result.dismiss) {
                    swal.resetDefaults();
                    swal(
                        'Cancelado',
                        'La empresa no fue creada',
                        'error'
                    );
                }
            });
          }
        });
    }

    crearVendedor() {
        const vendedor_obj = new VendedorCreate;
        vendedor_obj.cedula = this.vendedorForm.value.cedula;
        vendedor_obj.nombre = this.vendedorForm.value.nombre;
        console.log(vendedor_obj);

        this.custodioService.addVendedor(vendedor_obj).subscribe(
            data => {
                 swal(
                'Creado',
                'El vendedor fue creado con éxito.',
                'success'
                );
                this.custodioService.getVendedores().subscribe(
                    vendedores => {
                        this.vendedores = vendedores;
                    },
                    err => console.log(err)
                );
            },
            err => {
                console.log('error post:');
                console.log(err);
                swal(
                    'Cancelado',
                    'El vendedor no fue creado',
                    'error'
                );
            }
        ); 

    }

    guardarVendedorModal() {
        
        swal.resetDefaults();
        swal({
            title: 'Crear Vendedor',
            text: 'Desea crear Vendedor?',
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
                this.crearVendedor()
            } else if (result.dismiss) {
                swal(
                    'Cancelado',
                    'El vendedor no fue creado',
                    'error'
                );
            }
        });
        
    }

    addCorreo(correo_obj){
        if (!this.correos_selected.filter(correo => correo.id === correo_obj.id)[0]) {
            this.correos_selected.push(correo_obj);
        }
    }

    deleteCorreo(correo_obj) {
        this.correos_selected.splice(this.correos_selected.findIndex(e => e.id === correo_obj.id), 1)
    }

    openCrearCorreo() {
        const correo_crear = {
            correo: ''
        };
        swal({
            title: 'Crear nuevo correo',
            input: 'email',
            showCancelButton: true,
            confirmButtonText: 'Crear',
            showLoaderOnConfirm: true,
            preConfirm: (correo) => {
                correo_crear.correo = correo;
                this.custodioService.addCorreo(correo_crear).subscribe(
                    data => {
                        swal(
                            'Creado',
                            'El correo fue creado con éxito.',
                            'success'
                        );
                        console.log(data);
                        this.custodioService.getCorreos().subscribe(
                            correos => this.correos = correos,
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
