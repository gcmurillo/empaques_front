import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Policie } from '../../../shared/policie/policie';
import { PolicieService } from '../../../services/policie/policie.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-policies-list',
    templateUrl: './policies-list.component.html',
    styleUrls: ['./policies-list.component.scss',
        '../../../../assets/icon/icofont/css/icofont.scss']
})
export class PoliciesListComponent implements OnInit {

    rows = [];
    selected = [];
    policie_id: number;
    policie_name: string;
    temp_Filter = [];
    policie: Policie;


    constructor(private policieService: PolicieService) { }

    ngOnInit() {
        this.policieService.getPolicies().subscribe(policies => this.rows = policies, err => console.log('error: ' + err));
        this.temp_Filter = this.rows;
        this.policie = null;
    }

    onSelect({ selected }) {
        this.selected.splice(0, this.selected.length);
        this.selected.push(...selected);
    }

    onActivate(event) {
        console.log(event);
        if (event.type === 'dblclick') {
            this.policie_id = event.row.id;
            this.policie_name = event.row.name;
            this.policieService.getPolicie(this.policie_id).subscribe(policeResult => this.policie = policeResult,
                                                                    err => console.log('error: ' + err));
        }
        console.log(this.policie);
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
        this.policie_id = null;
        this.policie_name = '';
        this.policie = null;
    }

    delete(selected) {
        const temp = [];
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
