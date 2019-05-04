import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { catchError, switchMap } from 'rxjs/internal/operators';
import { CustomValidators } from 'ng2-validation';
import swal from 'sweetalert2';

import { Pool } from '../../../shared/pool/pool';
import { PoolService } from '../../../services/pool/pool.service';

import { Farm } from '../../../shared/farm/farm';
import { FarmService } from '../../../services/farm/farm.service';

@Component({
    selector: 'app-pool-edit',
    templateUrl: './pool-edit.component.html',
    styleUrls: ['./pool-edit.component.scss']
})
export class PoolEditComponent implements OnInit {

    private id: string;
    pool: Pool;
    farms: Farm[];

    constructor(private route: ActivatedRoute,
        private poolService: PoolService,
        private _router: Router,
        private farmService: FarmService) {
        this.route.params.pipe(
            switchMap(params => this.poolService.getPool(params['id'])),
        ).subscribe(
            poolResult => {
                this.pool = poolResult;
            },
            err => {
                if (err !== null) {
                    console.log(err);
                }
            }
        );
        this.farmService.getFarms().
            subscribe(farms => {
                this.farms = farms;
            });

        console.log(this.farms);
    }

    ngOnInit() {
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
                // this.update();
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
