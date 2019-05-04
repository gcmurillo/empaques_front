import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import swal from 'sweetalert2';
import { IOption } from 'ng-select';

import { Company } from '../../../shared/company/company';
import { CompanyService } from '../../../services/company/company.service';

@Component({
    selector: 'app-farm-create',
    templateUrl: './farm-create.component.html',
    styleUrls: ['./farm-create.component.scss',
        '../../../../assets/icon/icofont/css/icofont.scss']
})
export class FarmCreateComponent implements OnInit {

    companies: Company[];
    companySelected: Company = {
        _id: '',
        name: '',
        detail: '',
        businessId: '',
        farms: [],
        warehouses: [],
        __v: 0
    };

    name = '';
    detail = '';
    locate = '';
    area = 0;

    constructor(
        private companyService: CompanyService, private _router: Router) {

    }

    ngOnInit() {
        this.companyService.getCompanies().subscribe(companies => this.companies = companies);
    }

    onSubmit() {
    }

    openSuccessSwal() {
        swal({
            title: 'Nueva camaronera!',
            text: 'Guardado',
            type: 'success'
        }).catch(swal.noop);
    }

    getCompValue(selectedValue) {
        // this.companyService.getCompany(selectedValue).subscribe(company => this.companySelected = company.name);
        console.log(this.name);
        console.log(this.companySelected);
    }

    createFarm () {
        const farm = {
            name: this.name,
            detail: this.detail,
            locate: this.locate,
            area: this.area
        };
        this.companySelected.farms.push(farm);
        console.log(this.companySelected);
        this.companyService.updateCompany(this.companySelected).subscribe(data => {
            swal(
                'Guardado con exito!',
                'Camaronera creada',
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
