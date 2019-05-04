import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Convert } from '../../../shared/convert/convert';
import { ConvertService } from '../../../services/convert/convert.service';
import {CustomValidators} from 'ng2-validation';
import swal from 'sweetalert2';
@Component({
  selector: 'app-convert-list',
  templateUrl: './convert-list.component.html',
  styleUrls: ['./convert-list.component.scss']
})
export class ConvertListComponent implements OnInit {
  rows = [];
  selected = [];
  convert_id: number;
  convert_startUnit: string;
  convert_endUnit: string;
  convert_factor: number;
  temp_Filter = [];
  myForm: FormGroup;
  mynumberForm: FormGroup;
  mytooltipForm: FormGroup;
  checkdropForm: FormGroup;
  submitted: boolean;
  constructor(private convertService: ConvertService) {
    const name = new FormControl('', Validators.required);
    const code = new FormControl('', Validators.required);
    this.myForm = new FormGroup({
      name: name,
      code: code,
    });
  }
  ngOnInit() {
    this.convertService.getConverts().subscribe(converts => this.rows = converts, err => console.log('error: ' + err));
    this.temp_Filter = this.rows;
    console.log(this.temp_Filter);
  }

  fetch(cb) {
      const req = new XMLHttpRequest();
      req.open('GET', `assets/data/converts_data.json`);

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
          this.convert_id = event.row.id;
          this.convert_startUnit = event.row.startUnit;
          this.convert_endUnit = event.row.endUnit;
          this.convert_factor = event.row.factor;
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
    this.convert_id = null;
    this.convert_startUnit = '';
    this.convert_endUnit = '';
    this.convert_factor = null;
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
  onSubmit() {
    this.submitted = true;
    console.log(this.myForm);
  }
  openSuccessSwal() {
    swal({
      title: 'Nueva convercion agregada!',
      text: 'Guardado',
      type: 'success'
    }).catch(swal.noop);
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
          'conversion editada',
          'success'
        );
        // ('#modalInformation').hide();
        // this.viewmodal.hide();
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
