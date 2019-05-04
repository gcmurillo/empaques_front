import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subcategory } from '../../../shared/product/subcategory/subcategory';
import { SubcategoryService } from '../../../services/product/subcategory/subcategory.service';
import {CustomValidators} from 'ng2-validation';
import swal from 'sweetalert2';
@Component({
  selector: 'app-product-subcategory',
  templateUrl: './product-subcategory.component.html',
  styleUrls: ['./product-subcategory.component.scss']
})
export class ProductSubcategoryComponent implements OnInit {
  rows = [];
  selected = [];
  subcategory_id: number;
  subcategory_name: string;
  subcategory_code: string;
  temp_Filter = [];
  myForm: FormGroup;
  mynumberForm: FormGroup;
  mytooltipForm: FormGroup;
  checkdropForm: FormGroup;
  submitted: boolean;
  constructor(private subcategoryService: SubcategoryService) {
    const name = new FormControl('', Validators.required);
    const code = new FormControl('', Validators.required);
    this.myForm = new FormGroup({
      name: name,
      code: code,
    });
  }
  ngOnInit() {
    this.subcategoryService.getSubcategories().subscribe(subcategories => this.rows = subcategories, err => console.log('error: ' + err));
    this.temp_Filter = this.rows;
    console.log(this.temp_Filter);
  }

  fetch(cb) {
      const req = new XMLHttpRequest();
      req.open('GET', `assets/data/subcategories_data.json`);

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
          this.subcategory_id = event.row.id;
          this.subcategory_name = event.row.name;
          this.subcategory_code = event.row.brand;
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
    this.subcategory_id = null;
    this.subcategory_name = '';
    this.subcategory_code = '';
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
      title: 'Nueva subcategoria agregada!',
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
          'Usuario editado',
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
