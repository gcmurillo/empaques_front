import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, switchMap } from 'rxjs/internal/operators';
import swal from 'sweetalert2';

import { User } from '../../../shared/user/user';
import { UserService } from '../../../services/user/user.service';

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

    private id: number;
    user: User;

    constructor(private route: ActivatedRoute, private userService: UserService) { }

    ngOnInit() {
      console.log('', this.route.params.pipe());
      console.log('', this.route.params.pipe( switchMap(params => this.userService.getUser(+params['id'])), ));
        this.route.params.pipe(
            switchMap(params => this.userService.getUser(+params['id'])),
        ).subscribe(
            userResult => this.user = userResult,
            err => {
                if (err !== null) {
                  console.log(err);
                }
            }
        );
      console.log(this.user.name);
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
            'Usuario editado',
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
