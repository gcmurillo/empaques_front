import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../../../shared/user/user';
import { UserService } from '../../../services/user/user.service';
import swal from 'sweetalert2';
import { Observable } from 'rxjs/Observable';
import * as myGlobals from '../../../shared/globals/globals';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-user-table',
    templateUrl: './user-table.component.html',
    styleUrls: [
        './user-table.component.scss',
        // '../../../../assets/icon/icofont/css/icofont.scss'
    ]
})
export class UserTableComponent implements OnInit {
    rows = [];
    selected = [];
    user_id: number;
    user_name: string;
    user_last_name: string;
    user_company: string;
    user_username: string;
    user_groups = [];
    user_resources = [];
    user_user_level: string;
    user_parent: number;
    user_email: string;
    user_farm: string;
    temp_Filter = [];

    usersObservable: Observable<User[]>;

    users = [];
    // @ViewChild(DatatableComponent) table: DatatableComponent;

    constructor(private userService: UserService, private http: HttpClient) {
        // this.fetch((data) => {
        //     this.temp_Filter = [...data];
        //     this.rows = data;
        // });
    }

    ngOnInit() {
        this.userService.getUsers().subscribe(users => this.rows = users, err => console.log('error: ' + err));
        this.temp_Filter = this.rows;
        console.log(this.temp_Filter);
        /* console.log(this.usersObservable);
        this.usersObservable = this.http.get<User[]>('http://192.168.1.10:3300/users');
        console.log(this.usersObservable);
        for (let i of this.usersObservable) {
            console.log(i);
        }*/
    }

    fetch(cb) {
        const req = new XMLHttpRequest();
        req.open('GET', `assets/data/users_data.json`);

        req.onload = () => {
            cb(JSON.parse(req.response));
        };

        req.send();
    }

    onSelect({ selected }) {
        this.selected.splice(0, this.selected.length);
        this.selected.push(...selected);
    }

    onActivate(event) {
        console.log(event);
        if (event.type === 'dblclick') {
            this.user_id = event.row.id;
            this.user_name = event.row.name;
            this.user_last_name = event.row.last_name;
            this.user_company = event.row.company;
            this.user_email = event.row.email;
            this.user_farm = event.row.farm;
            this.user_groups = event.row.groups;
            this.user_user_level = event.row.user_level;
            this.user_parent = event.row.user_parent;
            this.user_resources = event.row.resources;
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
        this.user_id = null;
        this.user_name = '';
        this.user_email = '';
        this.user_company = '';
        this.user_farm = '';
    }

    delete(selected) {
        const temp = [];
        console.log(selected);
        for (const r of this.rows) {
            if (!selected.includes(r)) {
                temp.push(r);
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
                swal(
                    'Eliminado!',
                    'Su registro ha sido eliminado.',
                    'success'
                );
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
