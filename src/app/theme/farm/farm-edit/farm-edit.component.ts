import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { catchError, switchMap } from 'rxjs/internal/operators';
import swal from 'sweetalert2';

import { Farm } from '../../../shared/farm/farm';
import { FarmService } from '../../../services/farm/farm.service';

import { Company } from '../../../shared/company/company';
import { CompanyService } from '../../../services/company/company.service';

@Component({
    selector: 'app-farm-edit',
    templateUrl: './farm-edit.component.html',
    styleUrls: ['./farm-edit.component.scss']
})
export class FarmEditComponent implements OnInit {
    private id: string;
    farms: Farm[];
    farm: Farm = {
        _id: '',
        name: '',
        area: 0,
        detail: '',
        locate: '',
    };

    companies: Company[];
    company: Company;
    new_farms = [];

    constructor(private route: ActivatedRoute,
        private farmService: FarmService,
        private companyService: CompanyService,
        private _router: Router) { }

    ngOnInit() {
        console.log('-----------');
        this.id = this.route.snapshot.paramMap.get('id');
        console.log(this.id);
        this.route.params.pipe(
            switchMap(params => this.farmService.getFarms()),
        ).subscribe(
            farmResult => {
                this.farms = farmResult;
                this.farm = this.farms.filter(farm => farm._id === this.id)[0];
            },
            err => {
                if (err !== null) {
                    console.log(err);
                }
            }
        );
        this.companyService.getCompanies().subscribe(companyResult => this.companies = companyResult);
    }


    openSuccessCancelSwal() {
        swal({
            title: 'Desea guardar cambios?',
            text: 'Registro se modificara permanentemente!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, guardar!',
            cancelButtonText: 'No, cancelar!',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger mr-sm'
        }).then((result) => {
            if (result.value) {
                this.update();
            } else if (result.dismiss) {
                swal(
                    'Cancelado',
                    'Su registro no fue modificado :)',
                    'error'
                );
            }
        });
    }

    update() {
        this.companies.map(item => {
            if (item.farms.filter(farm => farm._id === this.id).length > 0) {
                this.company = item;
            }
        });
        console.log('------');
        this.new_farms = this.company.farms.map(item => (item._id === this.id) ? this.farm : item);
        this.company.farms = this.new_farms;
        this.companyService.updateCompany(this.company).subscribe(data => {
            swal(
                'Guardado con exito!',
                'Camaronera editada',
                'success'
            );
            this._router.navigate(['/farm']);
        },
            error => {
                console.log('Error: ', error);
                swal(
                    'Error',
                    'Error al guardar. Verifique su conexion',
                    'error'
                );
            });
    }


}
