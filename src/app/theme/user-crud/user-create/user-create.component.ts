import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import swal from 'sweetalert2';
import { ITreeOptions } from 'angular-tree-component';

import { Company } from '../../../shared/company/company';
import { CompanyService } from '../../../services/company/company.service';
import { Role } from '../../../shared/role/roles';
import { RoleService } from '../../../services/role/role.service';


@Component({
    selector: 'app-user-create',
    templateUrl: './user-create.component.html',
    styleUrls: ['./user-create.component.scss',
        '../../../../assets/icon/icofont/css/icofont.scss',
        '../../../../../node_modules/angular-tree-component/dist/angular-tree-component.css'],
    encapsulation: ViewEncapsulation.None
})
export class UserCreateComponent implements OnInit {

    myForm: FormGroup;
    mynumberForm: FormGroup;
    mytooltipForm: FormGroup;
    checkdropForm: FormGroup;
    submitted: boolean;

    companies = [];
    companySelected: string;

    rows = [];
    selected = [];

    selectedTreeList = [];

    nodes = [];
    options: ITreeOptions = {
        useCheckbox: true
    };

    resources_list = [];

    columns: any[] = [
      { name: 'Recurso Predeterminado', prop: 'name'}
    ];

    resources_names = [];
    resources_prede = [];
    resource_prede_name = '';
    selected_group = [];

    constructor(private companyService: CompanyService, private roleService: RoleService) {

        const name = new FormControl('', Validators.required);
        const password = new FormControl('', Validators.required);
        const username = new FormControl('', Validators.required);
        const email = new FormControl('', [Validators.required, Validators.email]);

        const rpassword = new FormControl('', [Validators.required, CustomValidators.equalTo(password)]);
        this.myForm = new FormGroup({
            name: name,
            email: email,
            password: password,
            rpassword: rpassword,
            username: username
        });
    }

    ngOnInit() {
        this.companyService.getCompanies().subscribe(companies => {
            this.companies = companies;
            console.log(this.companies);
            this.initNodes();
        }, err => console.log('error: ' + err));
        this.roleService.getRoles().subscribe(roles => this.rows = roles, err => console.log('error: ' + err));
    }

    onSubmit() {
        this.submitted = true;
        // console.log(this.myForm);
    }

    getCompValue(selectedValue) {
        this.companyService.getCompany(selectedValue).subscribe(company => this.companySelected = company.name);
    }

    openSuccessSwal() {
        swal({
            title: 'Nuevo Usuario!',
            text: 'Guardado',
            type: 'success'
        }).catch(swal.noop);
    }

    onSelect(event) {
        this.resources_list = [];
        this.resources_names = [];
        this.selectedTreeList = Object.entries(event.treeModel.selectedLeafNodeIds)
            .filter(([key, value]) => {
                return (value === true);
            }).map((node) => node[0]);
        for (const i of this.selectedTreeList) {
            this.resources_list.push(event.treeModel.getNodeById(i).data);
            this.resources_names.push(event.treeModel.getNodeById(i).data.name);
        }
        console.log(this.resources_list);
    }

    onSelectTableResources({ selected }) {
        this.resources_prede = selected;
        this.resource_prede_name = selected[0].name;
        // console.log(this.resources_prede);
        // console.log(this.resource_prede_name);
    }

    onSelectGroup({ selected }) {
        this.selected_group.splice(0, this.selected_group.length);
        this.selected_group.push(...selected);
        // console.log(this.selected_group);
    }

    initNodes() {
        const node_temp = [];
        for (const com of this.companies) {
            console.log(com);
            const farms = [];
            const warehouses = [];
            for (const farm of com.farms) {
                farms.push(farm);
            }
            for (const warehouse of com.warehouses) {
                warehouses.push(warehouse);
            }
            node_temp.push({
                id: com._id,
                name: com.name,
                children: [
                    {
                        name: 'Camaroneras',
                        children: farms
                    },
                    {
                        name: 'Bodegas',
                        children: warehouses
                    }
                ]
            });
            // console.log(node_temp);
        }
        this.nodes = node_temp;
    }

}
