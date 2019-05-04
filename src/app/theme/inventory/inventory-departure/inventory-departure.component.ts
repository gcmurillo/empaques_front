import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import swal from 'sweetalert2';
import { IOption } from 'ng-select';

import { Move } from '../../../shared/move/move';
import { Product } from '../../../shared/product/product';
import { Stock } from '../../../shared/product/stock/stock';
import { ProductService} from '../../../services/product/product.service';
import { StockService} from '../../../services/product/stock/stock.service';


@Component({
  selector: 'app-inventory-departure',
  templateUrl: './inventory-departure.component.html',
  styleUrls: ['./inventory-departure.component.scss',
  '../../../../assets/icon/icofont/css/icofont.scss']
})
export class InventoryDepartureComponent implements OnInit {
  rows = [];
  selected = [];
  temp_Filter = [];
  myForm: FormGroup;
  ingresos: FormGroup[] = [];
  mynumberForm: FormGroup;
  mytooltipForm: FormGroup;
  checkdropForm: FormGroup;
  submitted: boolean;

  products: Product [];
  stocks: Stock [];
  showIncomeForm = false;
  constructor(
    private productService: ProductService,
    private stockService: StockService,
    private fb: FormBuilder
  ) {
    const id = new FormControl('', Validators.required);
    const type = new FormControl('', Validators.required);
    const product = new FormControl( null, Validators.required);
    const fix = new FormControl('', Validators.required);
    const provider = new FormControl(null, Validators.required);
    const presentation = new FormControl('', Validators.required);
    const price = new FormControl('', Validators.required);
    const amount = new FormControl('', Validators.required);
    this.myForm = new FormGroup({
      id: id,
      type: type,
      product: product,
      fix: fix,
      provider: provider,
      presentation: presentation,
      price: price,
      amount: amount,
    });
    this.ingresos = [];
  }

  ngOnInit() {
    this.stockService.getStocks().subscribe(stocks =>
      this.stocks = stocks,
      err => console.log('error: ' + err));

    this.productService.getProducts().subscribe(products =>
      this.products = products,
      err => console.log('error: ' + err));
      this.rows = this.setStockProduct();
  }
  setStockProduct() {
    const ProductStock = [];
    let ArrayTemp = [];
    ArrayTemp = this.stocks.map((stockS) => stockS.product);
    for (const i of ArrayTemp) {
      ProductStock.push( this.products.filter((product) => product._id === i)[0]);
    }
    return ProductStock;
  }
  onActivate(event) {
      console.log('Activate Event', event);
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
  // addForm() {
  //   // let tempForm: FormGroup;
  //   const name = new FormControl('', Validators.required);
  //   const tempForm = new FormGroup({
  //     name: name,
  //   });
  //   this.ingresos.push(tempForm);
  // }
  // removeForm(ingreso) {
  //   const index = this.ingresos.indexOf(ingreso, 0);
  //   if (index > -1) {
  //     this.ingresos.splice(index, 1);
  //   }
  //   console.log(index);
  // }
  updateFilter(event) {
      const val = event.target.value.toLowerCase();

      // filter our data
      const temp = this.temp_Filter.filter(
      function(d) {
        let p: any;
        p =
        (d.name.toLowerCase().indexOf(val) !== -1 || !val )
        || (d.brand.toLowerCase().indexOf(val) !== -1 || !val)
        || (d.quantity.toLowerCase().indexOf(val) !== -1 || !val);
        return p;
      });

      // update the rows
      this.rows = temp;
      // Whenever the filter changes, always go back to the first page
      // this.table.offset = 0;
  }
  setSelectedProduct(row) {
    // console.log('row id', row.id);
    // console.log(' id Validators', this.stockService.firstEntry(row.id));
    if (this.checkOnIngresos(row)) {
      this.selected.splice(0, this.selected.length);
      this.selected.push(...row);
      console.log('se anadio');
      this.addForm(row);
    } else {
      console.log('no se anadio');
      // call modal....................<<<<<<<
    }
  }
  checkOnIngresos(row) {
    let bandera = false;
    console.log(this.ingresos.length);
    if ( this.ingresos.length !== 0) {
      for (const ingreso of this.ingresos) {
        console.log(row);
        if ( (!bandera) && (row._id === ingreso.value.product._id)) {
          bandera = true;
          break;
        }
      }
    }
    return !bandera;
  }
  addForm(row) {
    console.log('start getting data to ingreso', row);
    if ( row ) {
      console.log('start getting data to ingreso');
      let tempForm: FormGroup;
      const _id = new FormControl('', Validators.required);
      const product = new FormControl(null, Validators.required);
      const date = new FormControl(null, Validators.required);
      const detail = new FormControl('', Validators.required);
      const type = new FormControl('', Validators.required);
      const fix = new FormControl(null, Validators.required);
      const quantity = new FormControl(null, Validators.required);
      const price = new FormControl(null, Validators.required);
      const total = new FormControl(null, Validators.required);
      const quantityStock = new FormControl(null, Validators.required);
      const priceStock = new FormControl(null, Validators.required);
      const totalStock = new FormControl(null, Validators.required);
      tempForm = new FormGroup({
        _id: _id,
        product: product,
        date: date,
        detail: detail,
        type: type,
        fix: fix,
        quantity: quantity,
        price: price,
        total: total,
        quantityStock: quantityStock,
        priceStock: priceStock,
        totalStock: totalStock,
      });
      console.log('Checking id row row selectable', row._id);
      const tempProduct = this.products.filter( (prod) => (prod._id === row._id) )[0];
      tempForm.value._id = null;
      tempForm.value.product = tempProduct;
      tempForm.value.date = null;
      tempForm.value.detail = '';
      tempForm.value.type = 'income';
      tempForm.value.fix = null;
      tempForm.value.quantity = null;
      tempForm.value.price = null;
      tempForm.value.total = null;
      tempForm.value.quantityStock = null;
      tempForm.value.priceStock = null;
      tempForm.value.totalStock = null;
      if ((this.showIncomeForm) && ((this.stocks.filter((stock) =>  (stock.product === row._id)).length) > 0)) {
        const tempStock: Stock = this.stocks.filter((stock) =>  (stock.product === row._id))[0];
        console.log ('tempStock',  this.stocks.filter((stock) => (stock.product === row._id))[0]);
        tempForm.value.priceStock = tempStock.price;
        tempForm.value.quantityStock = tempStock.amount;
        tempForm.value.totalStock = tempStock.total;
        console.log(tempForm.value.priceStock );
        console.log(tempForm.value.quantityStock );
        console.log(tempForm.value.totalStock );
      } else {
        tempForm.value.priceStock = null;
        tempForm.value.quantityStock = null;
        tempForm.value.totalStock = null;
      }
      this.ingresos.push(tempForm);
      console.log(tempForm);
    } else {
      console.log('elemento ya ingresado');
    }
  }
  removeForm(ingreso) {
    const index = this.ingresos.indexOf(ingreso, 0);
    if (index > -1) {
      this.ingresos.splice(index, 1);
    }
    console.log(index);
  }
  changeValue() {
    this.showIncomeForm = !this.showIncomeForm;
    // if ( this.showIncomeForm === true) {
    //   this.rows = this.rowStocks;
    // } else {
    //   this.rows = this.products;
    // }
    if ( this.showIncomeForm === true) {
      if ( this.ingresos.length > 0) {
        const forDelete = [];
        for (const ingreso of this.ingresos) {
          // console.log('valor ingreso', ingreso);
          if ( this.stocks.map((stock) => (stock._id) ).indexOf(ingreso.value.product._id) > -1) {
            // console.log('tempStock', this.stocks.filter((stock) => {return (stock.product === ingreso.value.product); }) );
            const tempStock = this.stocks.filter((stock) => (stock.product === ingreso.value.product._id) );
            console.log('TempStock', tempStock);
            ingreso.value.quantity = null;
            ingreso.value.priceStock = tempStock[0].price;
            ingreso.value.totalStock = null;
            // ingreso.value.totalStock = tempStock[0].total;
          } else {
            forDelete.push(this.ingresos.indexOf(ingreso));
          }
          console.log(ingreso);
        }
        if (forDelete.length > 1) {
          forDelete.reverse();
        }
        for ( const i of forDelete) {
          this.ingresos.splice(i, 1);
        }
      }
    } else {
      // this.rows = this.products;
      if ( this.ingresos.length > 0) {
        for (const ingreso of this.ingresos) {
          ingreso.value.priceStock = null;
          ingreso.value.amountStock = null;
          ingreso.value.totalStock = null;
        }
      }
    }
    this.rows = [...this.rows];
  }
}
