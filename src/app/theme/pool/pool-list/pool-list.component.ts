import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Pool } from '../../../shared/pool/pool';
import { PoolService } from '../../../services/pool/pool.service';
import { Farm } from '../../../shared/farm/farm';
import swal from 'sweetalert2';

@Component({
    selector: 'app-pool-list',
    templateUrl: './pool-list.component.html',
    styleUrls: [
        './pool-list.component.scss',
        '../../../../assets/icon/icofont/css/icofont.scss'
    ]
})
export class PoolListComponent implements OnInit {

    rows = [];
    selected = [];
    temp_Filter = [];
    selected_pool: Pool = {
        _id: '',
        code: '',
        description: '',
        farm: {
            _id: '',
            name: '',
            detail: '',
            locate: '',
            area: 0
        }
    };

    constructor(private poolService: PoolService) { }

    ngOnInit() {
        this.poolService.getPools().subscribe(pools => this.rows = pools, err => console.log('error: ', err));
        this.temp_Filter = this.rows;
    }

    onSelect({ selected }) {
        this.selected.splice(0, this.selected.length);
        this.selected.push(...selected);
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
            return d.code.toLowerCase().indexOf(val) !== -1 || !val;
        });

        // update the rows
        this.rows = temp;
        // Whenever the filter changes, always go back to the first page
        // this.table.offset = 0;
    }

    onActivate(event) {
        if (event.type === 'dblclick') {
            this.selected_pool = event.row;
            console.log(this.selected_pool);
        }
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

    clean_modal() {
        this.selected_pool = {
            _id: '',
            code: '',
            description: '',
            farm: {
                _id: '',
                name: '',
                detail: '',
                locate: '',
                area: 0
            }
        };
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
                swal(
                    'Eliminado!',
                    'Su registro ha sido eliminado.',
                    'success'
                );
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
