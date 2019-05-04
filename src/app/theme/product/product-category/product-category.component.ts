import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Category } from '../../../shared/product/category/category';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import { CategoryService } from '../../../services/product/category/category.service';
import { SubcategoryService } from '../../../services/product/subcategory/subcategory.service';
import {CustomValidators} from 'ng2-validation';
import swal from 'sweetalert2';
import {SharedModule} from '../../../shared/shared.module';
import {UiSwitchModule} from 'ng2-ui-switch';
import {TagInputModule} from 'ngx-chips';
import { NgStyle } from '@angular/common';
// import { ModalDirective } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss',
  '../../../../assets/icon/icofont/css/icofont.scss'
]
})
// @ViewChild('modalInformation') public modal: ModalDirective;
export class ProductCategoryComponent implements OnInit {
@ViewChild('myTable') table: any;
  rows = [];
  selected = [];

  category_id: number;
  category_name: string;
  category_code: string;
  category_detail: string;
  category_parent: string;
  public Nombre: string;
  public code: string;
  public detail: string;
  temp_Filter = [];
  myForm: FormGroup;
  mynumberForm: FormGroup;
  mytooltipForm: FormGroup;
  checkdropForm: FormGroup;
  categoryForm: FormGroup;
  categorySelected: Category;
  categories: Category[];

  subcategoryForm: FormGroup;
  subcategorySelected: string;
  subcategories: Category[];
  showCategories = false;
  // viewmodal: modalInformation;
  submitted: boolean;
  constructor(private categoryService: CategoryService,
    private subcategoryService: SubcategoryService,
    private fb: FormBuilder
  ) {
    this.showCategories = false;
    const name = new FormControl('', Validators.required);
    const code = new FormControl('', Validators.required);
    const detail = new FormControl('', Validators.required);
    const parent = new FormControl('', Validators.required);
    this.myForm = new FormGroup({
      name: name,
      code: code,
      detail: detail,
      parent: parent,
    });
  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(categories =>
      this.categories = categories,
      err => console.log('error: ' + err));
    // this.categoryForm = this.fb.group({});
    this.subcategoryService.getSubcategories().subscribe(subcategories =>
      this.subcategories = subcategories,
      err => console.log('error: ' + err));
    this.categories.map((category) => (this.rows.push(category)) );
    this.subcategories.map((category) => (this.rows.push(category)) );
    console.log(this.rows);
    this.temp_Filter = this.rows;
    console.log(this.temp_Filter);
  }

  fetch(cb) {
      const req = new XMLHttpRequest();
      req.open('GET', `assets/data/categories_data.json`);

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
          this.category_id = event.row._id;
          this.category_name = event.row.name;
          this.category_code = event.row.code;
          this.category_detail = event.row.detail;
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
      let p: any;
      p =
      (d.name.toLowerCase().indexOf(val) !== -1 || !val )
      || (d.code.toString().toLowerCase().indexOf(val) !== -1 || !val)
      || (d.detail.toLowerCase().indexOf(val) !== -1 || !val);
      return p;
      });

      // update the rows
      this.rows = temp;
      // Whenever the filter changes, always go back to the first page
      // this.table.offset = 0;
  }

  clean_modal() {
    this.category_id = null;
    this.category_name = '';
    this.category_code = null;
    this.category_detail = '';
    this.category_parent = null;
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
    // this.myForm.value.parent = this.categories[indexOf(category)].code;
    this.myForm.value.name = this.category_name;
    this.myForm.value.code = this.category_code;
    this.myForm.value.detail = this.category_detail;
    console.log(this.myForm);
  }
  openSuccessSwal() {
    swal({
      title: 'Nueva categoria agregada!',
      text: 'Guardado',
      type: 'success'
    }).catch(swal.noop);
    this.onSubmit();
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
  changeValue() {
    this.showCategories = !this.showCategories;
  }
  setCategory(categorySelected) {
    this.myForm.value.parent = categorySelected.code;
  }
  toggleExpandGroup(group) {
    console.log('Toggled Expand Group!', group);
    this.table.groupHeader.toggleExpandGroup(group);
  }
  getCategoryName(group) {
    let nameGroup = '';
    if ( group.value[0].parent === null) {
      nameGroup = 'Categorias Padres';
    } else {
      nameGroup = this.categories.filter(
        (categoria) => (categoria.code === group.value[0].parent))[0].name;
    }
    return nameGroup;
  }
}
