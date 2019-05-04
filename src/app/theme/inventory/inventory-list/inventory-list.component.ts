import { Component, OnInit } from '@angular/core';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import { FormControl, FormGroup } from '@angular/forms';
import { Move } from '../../../shared/move/move';
import { Product } from '../../../shared/product/product';
import { Stock } from '../../../shared/product/stock/stock';

import { MoveService } from '../../../services/product/move/move.service';
import { StockService } from '../../../services/product/stock/stock.service';
import { ProductService } from '../../../services/product/product.service';
@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss',
  '../../../../assets/icon/icofont/css/icofont.scss'
]
})
export class InventoryListComponent implements OnInit {
  rows = [];
  selected = [];
  stock__id: number;
  stock_product: Product;
  stock_productId: number;
  stock_inventary: string;
  stock_quantity: number;
  stock_price: number;
  stock_amount: number;
  products: Product[];
  stocks: Stock [];
  // moves: Move [];
  temp_Filter = [];
  autorized = true;
  constructor(
    // private moveService: MoveService,
    private productService: ProductService,
    private stockService: StockService) { }

  ngOnInit() {
    // this.moveService.getMoves().subscribe(
    //   moves => this.moves = moves,
    //   err => console.log('error: ' + err)
    // );
    this.stockService.getStocks().subscribe(
      stocks => this.stocks = stocks,
      err => console.log('error: ' + err)
    );
    this.productService.getProducts().subscribe(
      products => this.products = products,
      err => console.log('error: ' + err)
    );

    this.rows = this.stocks.map((stock) => {
    const tempProduct = this.products.filter( (product) =>
      (product._id === stock.product)
    )[0];
    console.log('Prod', tempProduct);
    let NewJson: any;
      NewJson = [
        {
          _id: stock._id,
          inventary: stock.inventary,
          product: tempProduct,
          // productName: tempProduct.name,
          // productCode: tempProduct.code,
          // productDetail: tempProduct.detail,
          Quantity: stock.amount,
          Price: stock.price,
          Total: stock.total,
        }
      ];
    return (NewJson[0]);
    });
  this.temp_Filter = this.rows;
  console.log(this.temp_Filter);
  this.stock_product = this.products[0];
  }
  fetch(cb) {
      const req = new XMLHttpRequest();
      req.open('GET', `assets/data/move_data.json`);

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
        this.stock__id = event.row._id;
        this.stock_product = event.row.product;
        this.stock_productId = event.row.product._id;
        this.stock_inventary = event.row.inventary;
        this.stock_quantity = event.row.Quantity;
        this.stock_price = event.row.Price;
        this.stock_amount = event.row.Total;
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
      const temp = this.temp_Filter.filter(function(d) {
        let p: any;
            p =
            (d.name.toLowerCase().indexOf(val) !== -1 || !val )
            || (d.brand.toLowerCase().indexOf(val) !== -1 || !val)
            || (d.quantity.toLowerCase().indexOf(val) !== -1 || !val);
            return p;
      });
      this.rows = temp;
  }

  clean_modal() {
    this.stock__id = null;
    this.stock_product = this.products[0];
    this.stock_productId = null;
    this.stock_inventary = '';
    this.stock_quantity = null;
    this.stock_price = null;
    this.stock_amount = null;
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
  // getProduct( idProduct) {
  //   console.log('set product', this.products.filter((product) => (product._id === idProduct))[0]);
  //   const ProductSelected: Product = this.products.filter((product) => (product._id === idProduct))[0];
  //   return ProductSelected;
  // }
}
