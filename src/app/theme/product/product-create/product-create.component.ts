import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormControl, FormGroup, Validators, FormBuilder, FormsModule} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import swal from 'sweetalert2';
// import { IOption } from 'ng-select';
import { NgSelectModule } from '@ng-select/ng-select';
// import { FormsModule } from '@angular/forms';
import { Category } from '../../../shared/product/category/category';
import { CategoryService } from '../../../services/product/category/category.service';
// import { Subcategory } from '../../../shared/product/subcategory/subcategory';
import { SubcategoryService } from '../../../services/product/subcategory/subcategory.service';
@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss',
    '../../../../assets/icon/icofont/css/icofont.scss'
  ]
})
export class ProductCreateComponent implements OnInit {
  myForm: FormGroup;
  mynumberForm: FormGroup;
  mytooltipForm: FormGroup;
  checkdropForm: FormGroup;
  submitted: boolean;
  categoryForm: FormGroup;
  categories: Category[];
  categorySelected: any;
  categorySelectedName: string;
  subcategoryForm: FormGroup;
  subcategories: Category[];
  subcategorySelected: any;
  subcategorySelectedName: string;
  constructor(
    private categoryService: CategoryService,
    private subcategoryService: SubcategoryService,
    private fb: FormBuilder
  ) {
    const code = new FormControl(null, Validators.required);
    const name = new FormControl('', Validators.required);
    const brand = new FormControl('', Validators.required);
    const manufacture = new FormControl('', Validators.required);
    const quantity = new FormControl('', Validators.required);
    const detail = new FormControl('', Validators.required);
    const packageP = new FormControl(null, Validators.required);
    const presentation = new FormControl('', Validators.required);
    const consumeUnit = new FormControl('', Validators.required);
    this.myForm = new FormGroup({
      code: code,
      name: name,
      brand: brand,
      manufacture: manufacture,
      quantity: quantity,
      detail: detail,
      packageP: packageP,
      presentation: presentation,
      consumeUnit: consumeUnit
    });
  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(categories => this.categories = categories);
    this.categoryForm = this.fb.group({
    });
    this.subcategoryService.getSubcategories().subscribe(subcategories => this.subcategories = subcategories);
    this.subcategoryForm = this.fb.group({
    });
  }
  onSubmit() {
    this.submitted = true;
    console.log(this.myForm);
  }
  openSuccessSwal() {
    swal({
      title: 'Nuevo producto agregado!',
      text: 'Guardado',
      type: 'success'
    }).catch(swal.noop);
  }
  // getCompValue( selectedCategoryValue, selectedSubcategoryValue ) {
  //   this.categoryService.getCategory(selectedCategoryValue).subscribe(category => this.categorySelected = category.code);
  // this.subcategoryService.getSubcategory(selectedSubcategoryValue).subscribe(subcategory => this.subcategorySelected = subcategory.code);
  // }
  getformValue() {
  console.log(this.categorySelected);
  console.log(this.categories.filter( (category) => {
    if (category._id === this.categorySelected ) {
      return category;
    }
  })[0].code);
  this.categorySelectedName = this.categories.filter( (category) => {
    if (category._id === this.categorySelected ) {
      return category;
    }
  })[0].code.toString();
  console.log(this.categorySelectedName);
  }
  getformValue2() {
  console.log(this.subcategorySelected);
  console.log(this.subcategories.filter( (category) => {
    if (category._id === this.subcategorySelected ) {
      return category;
    }
  })[0].code);
  this.subcategorySelectedName = this.subcategories.filter( (category) => {
    if (category._id === this.subcategorySelected ) {
      return category;
    }
  })[0].code.toString();
  console.log(this.categorySelectedName);
  }
  reduceSubCategories() {
  const cat = this.categories.filter((category) => (category._id === this.categorySelected))[0];
  console.log(cat);
  console.log(this.subcategories.filter( (subcategory) => {
    if (subcategory.parent === cat.code) {
      // console.log(subcategory);
      return subcategory;
    }
  }));
  this.subcategories = this.subcategories.filter( (subcategory) => {
    if (subcategory.parent === cat.code) {
      return subcategory;
    }
  });
  }
}
