import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Farm } from '../../../shared/farm/farm';
import { FarmService } from '../../../services/farm/farm.service';
import { CompanyService } from '../../../services/company/company.service';
import { Company } from '../../../shared/company/company';

import swal from 'sweetalert2';

@Component({
    selector: 'app-farm-list',
    templateUrl: './farm-list.component.html',
    styleUrls: ['./farm-list.component.scss',
        '../../../../assets/icon/icofont/css/icofont.scss'
    ]
})
export class FarmListComponent implements OnInit {
    rows = [];
    selected = [];
    farm_id: number;
    farm_name: string;
    farm_detail: string;
    farm_locate: string;
    farm_area: number;
    companies = [];
    farm_company: Company = {
        _id: '',
        name: '',
        detail: '',
        businessId: '',
        farms: [],
        warehouses: [],
        __v: 0
    };
    temp_Filter = [];

    constructor(private farmService: FarmService, private companyService: CompanyService) {
    }

    makeRequest() {
        this.farmService.getFarms().subscribe(farms => {
            this.rows = farms;
        }, err => console.log('error: ' + err));
    }

    ngOnInit() {
        this.farmService.getFarms().subscribe(farms => {
            // this.rows = farms;
            this.rows = farms;
            // console.log(this.rows);
        }, err => console.log('error: ' + err));
        this.companyService.getCompanies().subscribe(companies => {
            this.companies = companies;
        }, err => console.log('error: ' + err));
        this.temp_Filter = this.rows;
        // console.log('rows', this.rows);
    }

    setCompanies() {
        const temp_rows = [];
        for (const r of this.rows) {
            for (const com of this.companies) {
                com.farms.map(farm => {
                    if (farm._id === r._id) {
                        r.company = {
                            _id: com._id,
                            name: com.name,
                            farms: com.farms
                        };
                    }
                });
            }
        }
    }

    onSelect({ selected }) {
        this.selected.splice(0, this.selected.length);
        this.selected.push(...selected);
    }

    onActivate(event) {
        // console.log(event);
        this.setCompanies();
        if (event.type === 'dblclick') {
            this.farm_id = event.row._id;
            this.farm_name = event.row.name;
            this.farm_detail = event.row.detail;
            this.farm_locate = event.row.locate;
            this.farm_area = event.row.area;
            this.farm_company = event.row.company;
        }
    }
    add() {
        this.selected.push(this.rows[1], this.rows[3]);
    }

    update() {
        this.selected = [this.rows[1], this.rows[3]];
    }

    remove() {
        this.selected = [];
    }

    updateFilter(event) {
        const val = event.target.value.toLowerCase();

        // filter our data
        const temp = this.temp_Filter.filter(function(d) {
            return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        });

        // update the rows
        this.rows = temp;
        // Whenever the filter changes, always go back to the first page
        // this.table.offset = 0;
    }

    clean_modal() {
        this.farm_id = null;
        this.farm_name = '';
        this.farm_detail = '';
        this.farm_locate = '';
        this.farm_area = 0;
        this.farm_company = {
            _id: '',
            name: '',
            detail: '',
            businessId: '',
            farms: [],
            warehouses: [],
            __v: 0
        };
    }

    delete(selected) {
        const temp = [];
        for (const r of this.rows) {
            if (selected.includes(r)) {
                temp.push(r);
                this.farmService.deleteFarm(r).subscribe(data => {
                    this.makeRequest();
                    swal(
                        'Eliminado!',
                        'Su registro ha sido eliminado.',
                        'success'
                    );
                },
                    error => {
                        console.log('Error:', error);
                        swal(
                            'Error',
                            'Error al eliminar. Verifique su conexion',
                            'error'
                        );
                    });
            }
        }
        this.rows = temp;
        this.selected = [];
        console.log(this.rows);
        this.temp_Filter = this.rows;
    }

    openSuccessCancelSwal(selected) {
        swal({
            title: 'Desea borrar?',
            text: 'Registro se eliminara permanentemente!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminalo!',
            cancelButtonText: 'No, cancela!',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger mr-sm'
        }).then((result) => {
            if (result.value) {
                this.delete(selected);
            } else if (result.dismiss) {
                swal(
                    'Cancelado',
                    'Su registro no fue eliminado :)',
                    'error'
                );
            }
        });
    }

}
