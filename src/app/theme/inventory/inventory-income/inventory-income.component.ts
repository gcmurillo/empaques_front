import { Component, OnInit } from '@angular/core';
// import { IOption } from 'ng-select';
import { CommonModule } from '@angular/common';

import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import {SharedModule} from '../../../shared/shared.module';
import {CustomValidators} from 'ng2-validation';
import swal from 'sweetalert2';
// import {SelectModule} from 'ng-select';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
// import {DataTableModule} from 'angular2-datatable';
import { Move } from '../../../shared/move/move';
import { Product } from '../../../shared/product/product';
import { Stock } from '../../../shared/product/stock/stock';
import { Company } from '../../../shared/company/company';
import { Warehouse } from '../../../shared/warehouse/warehouse';
import { ProductService} from '../../../services/product/product.service';
import { CompanyService} from '../../../services/company/company.service';
import { WarehouseService} from '../../../services/warehouse/warehouse.service';
import { StockService} from '../../../services/product/stock/stock.service';
@Component({
  selector: 'app-inventory-income',
  templateUrl: './inventory-income.component.html',
  styleUrls: ['./inventory-income.component.scss',
  '../../../../assets/icon/icofont/css/icofont.scss']
})
export class InventoryIncomeComponent implements OnInit {
  rows = [];
  rowStocks = [];
  selected = [];
  temp_Filter = [];
  p = [];
  myForm: FormGroup;
  // name: string;
  // product: number;
  // brand: string;
  // package: number;
  // presentation: string;
  // consumeUnit: string;
  type = 'income';
  ingresos: FormGroup[] = [];
  mynumberForm: FormGroup;
  mytooltipForm: FormGroup;
  checkdropForm: FormGroup;
  submitted: boolean;

  stockSelected: Stock;
  stocks: Stock[];
  companyForm: FormGroup;
  companySelected: string;
  companyNameSelected: string;
  companies = [];

  productForm: FormGroup;
  productSelected: Product;
  productTestStatus: number;
  products: Product[];
  Listproducts: Array<any> = [];
  product_id: number;
  product_name: string;
  product_brand: string;
  product_manufacture: string;
  product_quantity: string;
  product_detail: string;

  warehouseForm: FormGroup;
  warehouseNameSelected: string;
  warehouseSelected: string;
  warehouses: Warehouse[];
  showIncomeForm = false;
  constructor(
    private productService: ProductService,
    private companyService: CompanyService,
    private warehouseService: WarehouseService,
    private stockService: StockService,
    private fb: FormBuilder
  ) {
    // this.showIncomeForm = true;
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
      console.log(this.stocks);
    this.companyService.getCompanies().subscribe(companies => {
      this.companies = companies;
      console.log(this.companies);
      this.companySelected = this.companies[0]._id;
      console.log('default company id', this.companies[0]._id);
      console.log('default company id', this.companySelected);
      this.companyNameSelected = this.getCompanyName(this.companySelected);
    }, err => console.log('error: ' + err));
    this.productService.getProducts().subscribe(products =>
      this.products = products,
      err => console.log('error: ' + err));
      console.log(this.products);
    // this.productForm = this.fb.group({
    // });
    this.warehouseService.getWarehouses().subscribe(warehouses => {
          this.warehouses = warehouses;
          this.warehouseSelected = this.warehouses[0]._id;
          this.warehouseNameSelected = this.getWarehouseName(this.warehouseSelected);
      });
    this.warehouseForm = this.fb.group({
    });
    // this.getformValue();
    this.rowStocks = this.setStockProduct();
    if ( !this.showIncomeForm) {
      this.rows = this.products;
    } else {
      this.rows = this.rowStocks;
    }
    this.temp_Filter = this.rows;
    console.log(this.temp_Filter);
  }
  onActivate(event) {
      console.log('Activate Event', event);
      if (event.type === 'dblclick') {
          this.product_id = event.row.id;
          this.product_name = event.row.name;
          this.product_brand = event.row.brand;
          this.product_manufacture = event.row.manufacture;
          this.product_quantity = event.row.quantity;
          this.product_detail = event.row.detail;
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
  clean_modal() {
    this.product_id = null;
    this.product_name = '';
    this.product_brand = '';
    this.product_manufacture = '';
    this.product_quantity = '';
    this.product_detail = '';
  }
  onSubmit() {
    this.submitted = true;
    console.log(this.ingresos);
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
  openSuccessSwal() {
    swal({
      title: 'Nuevo producto agregado!',
      text: 'Guardado',
      type: 'success'
    }).catch(swal.noop);
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
  onSelect(event) {

    // console.log('Select Event', event.selected, this.selected);
    if (this.checkOnIngresos(event)) {
      this.selected.splice(0, this.selected.length);
      this.selected.push(...event.selected);
      console.log('se anadio');
      this.addForm(event);
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
  changeValue() {
    this.showIncomeForm = !this.showIncomeForm;
    if ( this.showIncomeForm === true) {
      this.rows = this.rowStocks;
    } else {
      this.rows = this.products;
    }
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
      this.rows = this.products;
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
  removeForm(ingreso) {
    const index = this.ingresos.indexOf(ingreso, 0);
    if (index > -1) {
      this.ingresos.splice(index, 1);
    }
    console.log(index);
  }
  // setProduct(Product_id, indexForm ) {
  //   console.log('index de formulario', indexForm);
  //   console.log('indes de producto', Product_id);
  //   // const ProductTemp: Product =this.products.filter((product) => {return(product.id === ); });
  //   this.productService.getProduct(Product_id).subscribe(
  //     product => this.productSelected = product,
  //     );
  //   this.stockService.getProductStock(Product_id).subscribe(
  //     stock => this.stockSelected = stock,
  //     );
  //     this.ingresos[indexForm].value.product = this.productSelected._id,
  //     this.ingresos[indexForm].value.package_unit = this.productSelected.package,
  //     this.ingresos[indexForm].value.brand = this.productSelected.package,
  //     this.ingresos[indexForm].value.presentation = this.productSelected.presentation,
  //     this.ingresos[indexForm].value.presentation = this.productSelected.presentation,
  //     this.ingresos[indexForm].value.consumeUnit = this.productSelected.consumeUnit,
  //     this.ingresos[indexForm].value.description = this.productSelected.detail;
  //     if (!this.showIncomeForm) {
  //       this.ingresos[indexForm].value.price = this.stockSelected.price;
  //     }
  //     console.log(this.ingresos[indexForm].value.name);
  //     console.log(this.ingresos[indexForm].value.package_unit);
  // }
// .
// .
// .....react from select of company and warehouse
// .
// .
  getformValue() {
    this.companyNameSelected = this.getCompanyName(this.companySelected);
    this.warehouseNameSelected = this.getWarehouseName(this.warehouseSelected);
  }
  getCompanyName(index) {
    console.log('index company', index);
    let name = '';
    console.log('warehouse', this.companies.filter((company) => (company._id === index))[0].name );
    if (index !== null) {
      return this.companies.filter((company) => (company._id === index))[0].name ;
    } else {
      name = 'no index';
      return name;
    }
  }
  getWarehouseName(index) {
    console.log('index warehouse', index);
    let name = '';
    if (index !== null) {
      return this.warehouses.filter((warehouse) => warehouse._id === index)[0].name;
    } else {
      name = 'no index';
      return name ;
    }
  }
// .
// .set product stock (modify future feature for change inventory)
// .
  setStockProduct() {
    const ProductStock = [];
    let ArrayTemp = [];
    ArrayTemp = this.stocks.map((stockS) => stockS.product);
    for (const i of ArrayTemp) {
      ProductStock.push( this.products.filter((product) => product._id === i)[0]);
    }
    return ProductStock;
  }
}
