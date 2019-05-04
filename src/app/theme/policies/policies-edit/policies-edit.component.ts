import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, switchMap } from 'rxjs/internal/operators';
import swal from 'sweetalert2';

import { Policie } from '../../../shared/policie/policie';
import { PolicieService } from '../../../services/policie/policie.service';

@Component({
    selector: 'app-policies-edit',
    templateUrl: './policies-edit.component.html',
    styleUrls: ['./policies-edit.component.scss']
})
export class PoliciesEditComponent implements OnInit {

    private id: number;
    policie: Policie;
    rows = [];
    editing = {};

    constructor(private route: ActivatedRoute, private policieService: PolicieService) { }

    ngOnInit() {
        this.route.params.pipe(
            switchMap(params => this.policieService.getPolicie(+params['id'])),
        ).subscribe(
            policieResult => this.policie = policieResult,
            err => {
                if (err !== null) console.log(err)
            }
        );
        console.log(this.policie);
        this.rows = this.policie.statements;
    }

    openSuccessSwal() {
      swal({
        title: 'Guardado con exito!',
        text: 'Politica editada',
        type: 'success'
      }).catch(swal.noop);
    }

    updateValue(event, cell, row) {
      this.editing[row + '-' + cell] = false;
      this.rows[row][cell] = event.target.value;
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
          swal(
            'Guardado con exito!',
            'Politica editada',
            'success'
          );
        } else if (result.dismiss) {
          swal(
            'Cancelado',
            'Su registro no fue modificado :)',
            'error'
          );
        }
      });
    }


}
