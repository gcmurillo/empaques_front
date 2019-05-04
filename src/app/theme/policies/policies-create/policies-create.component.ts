import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';

@Component({
  selector: 'app-policies-create',
  templateUrl: './policies-create.component.html',
  styleUrls: ['./policies-create.component.scss']
})
export class PoliciesCreateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openSuccessSwal() {
    swal({
      title: 'Nueva Politica!',
      text: 'Guardado',
      type: 'success'
    }).catch(swal.noop);
  }

}
