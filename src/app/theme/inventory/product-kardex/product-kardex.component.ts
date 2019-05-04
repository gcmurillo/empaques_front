import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, switchMap } from 'rxjs/internal/operators';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import * as moment from 'moment';

import { Move } from '../../../shared/move/move';
import { Product } from '../../../shared/product/product';
import { MoveService } from '../../../services/product/move/move.service';
import { ProductService } from '../../../services/product/product.service';

@Component({
  selector: 'app-product-kardex',
  templateUrl: './product-kardex.component.html',
  styleUrls: ['./product-kardex.component.scss']
})
export class ProductKardexComponent implements OnInit {
  rows = [];
  selected = [];
  move__id: number;
  move_product: number;
  move_date: any;
  move_detail: string;
  move_type: string;
  move_fix: boolean;
  move_quantity: number;
  move_price: number;
  move_amount: number;
  move_quantityStock: number;
  move_priceStock: number;
  move_amountStock: number;
  temp_Filter = [];
  products: Product [];
  productSelected: Product;
  moves: Move [];

  constructor(
    private route: ActivatedRoute,
    private moveService: MoveService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(
      products => this.products = products,
      err => console.log('error: ' + err)
    );
    console.log('value', this.route.params.pipe( ) );
    console.log('value', this.route.params.pipe(switchMap(
      params => this.products.filter( (product) => { return (product._id === (+params['id'])); } ), )).subscribe(
      ));
    this.route.params.pipe(switchMap(
      params => this.products.filter( (product) => { return (product._id === (+params['id'])); } ), )).subscribe(
        productResult => this.productSelected = productResult,
        err => {
            if (err !== null) {
                console.log(err);
            }
        }
      );
    // this.route.params.pipe(switchMap(params => this.productService.getProduct(+params['id'])),
    // ).subscribe(
    //     productResult => this.productSelected = productResult,
    //     err => {
    //         if (err !== null) {
    //             console.log(err);
    //         }
    //     }
    // );
    console.log('product', this.productSelected);
    this.moveService.getMoves().subscribe(
      moves => this.moves = moves,
      err => console.log('error: ' + err)
    );
    console.log('moves', this.moves.filter((move) => { if (move.product === this.productSelected._id) {return move; } } ));
    const TempMoves = this.moves.filter((move) => { if (move.product === this.productSelected._id) {return move; } } );
    // this.rows = this.moves.map((move) => { if (move.product === this.productSelected._id) {return move; } } );
    this.rows = TempMoves.map((moves) => {
    let NewJson: any;
    if (moves.type === 'ingreso') {
      NewJson = [
        {
          date: moves.date,
          detail: moves.detail,
          incQuantity: moves.quantity,
          incPrice: moves.price,
          incTotal: moves.amount,
          depQuantity: null,
          depPrice: null,
          depTotal: null,
          stkQuantity: moves.quantityStock,
          stkPrice: moves.priceStock,
          stkTotal: moves.amountStock,
        }
      ];
    } else {
      NewJson = [
        {
          date: moves.date,
          detail: moves.detail,
          incQuantity: null,
          incPrice: null,
          incTotal: null,
          depQuantity: moves.quantity,
          depPrice: moves.price,
          depTotal: moves.amount,
          stkQuantity: moves.quantityStock,
          stkPrice: moves.priceStock,
          stkTotal: moves.amountStock,
        }
      ];
    }
    return (NewJson[0]);
  });
  console.log('newrow', this.rows);
    this.temp_Filter = this.rows;

  }
  onSelect({ selected }) {
      this.selected.splice(0, this.selected.length);
      this.selected.push(...selected);
  }
  onActivate(event) {
    console.log(event);
    if (event.type === 'dblclick') {
      this.move__id = event.row._id;
      this.move_product = event.row.product;
      this.move_date = event.row.date;
      this.move_detail = event.row.detail;
      this.move_type = event.row.type;
      this.move_fix = event.row.fix;
      this.move_quantity = event.row.quantity;
      this.move_price = event.row.price;
      this.move_amount = event.row.amount;
      this.move_quantityStock = event.row.quantityStock;
      this.move_priceStock = event.row.priceStock;
      this.move_amountStock = event.row.amountStock;
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
          (d.date.toLowerCase().indexOf(val) !== -1 || !val )
          // || (d.detail.toLowerCase().indexOf(val) !== -1 || !val)
          || (d.detail.toLowerCase().indexOf(val) !== -1 || !val);
          return p;
      });
      this.rows = temp;
  }
  clean_modal() {
    this.move__id = null;
    this.move_product = null;
    this.move_date = null;
    this.move_detail = '';
    this.move_type = '';
    this.move_fix = null;
    this.move_quantity = null;
    this.move_price = null;
    this.move_amount = null;
    this.move_quantityStock = null;
    this.move_priceStock = null;
    this.move_amountStock = null;
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
  getProduct( idProduct) {
    console.log('set product', this.products.filter((product) => (product._id === idProduct))[0]);
    const ProductSelected: Product = this.products.filter((product) => (product._id === idProduct))[0];
    return ProductSelected;
  }
}
