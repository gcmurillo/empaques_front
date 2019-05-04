import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, switchMap } from 'rxjs/internal/operators';
import swal from 'sweetalert2';

import { Product } from '../../../shared/product/product';
import { ProductService } from '../../../services/product/product.service';


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  private id: number;
  product: Product;
  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit() {
    this.route.params.pipe(
        switchMap(params => this.productService.getProduct(+params['id'])),
    ).subscribe(
        productResult => this.product = productResult,
        err => {
            if (err !== null) {
            console.log(err);
            }
        }
    );
  console.log(this.product.name);
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
