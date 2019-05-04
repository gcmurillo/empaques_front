import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Product } from '../../../shared/product/product';
import { ProductService } from '../../../services/product/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss',
  '../../../../assets/icon/icofont/css/icofont.scss'
]
})
export class ProductListComponent implements OnInit {
  rows = [];
  selected = [];
  product__id: number;
  product_name: string;
  product_brand: string;
  product_manufacture: string;
  product_quantity: string;
  product_detail: string;
  temp_Filter = [];
  p = [];
  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.productService.getProducts().subscribe(products => this.rows = products, err => console.log('error: ' + err));
    this.temp_Filter = this.rows;
    console.log(this.temp_Filter);
  }

      fetch(cb) {
          const req = new XMLHttpRequest();
          req.open('GET', `assets/data/products_data.json`);

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
              this.product__id = event.row._id;
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
        this.product__id = null;
        this.product_name = '';
        this.product_brand = '';
        this.product_manufacture = '';
        this.product_quantity = '';
        this.product_detail = '';
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
}
