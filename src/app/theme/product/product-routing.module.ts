import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductDepartureComponent } from './product-departure/product-departure.component';
import { ProductIncomeComponent } from './product-income/product-income.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ProductSubcategoryComponent } from './product-subcategory/product-subcategory.component';
import { ConvertListComponent } from './convert-list/convert-list.component';
const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/product-list',
  //   pathMatch: 'full'
  // },
  {
      path: '/product-list',
      component: ProductListComponent,
      data: {
          title: 'Maestro de Productos',
          status: true
      }
  },
  {
      path: 'product-list',
      component: ProductListComponent,
      data: {
          title: 'Maestro de Productos',
          status: true
      }
  },
  {
    path: 'product-create',
    component: ProductCreateComponent,
    data: {
        title: 'Crear producto',
        status: true
    }
  },
  {
    path: 'product-income',
    component: ProductIncomeComponent,
    data: {
        title: 'Ingresos de productos',
        status: true
    }
  },
  {
    path: 'product-departure',
    component: ProductDepartureComponent,
    data: {
        title: 'Egresos de productos',
        status: true
    }
  },
  {
  path: 'product-edit/:id',
  component: ProductEditComponent,
  data: {
      title: 'Editar producto',
      status: true
  }
  },
  {
  path: '/product-category',
  component: ProductCategoryComponent,
  data: {
      title: 'Categoria de producto',
      status: true
  }
  },
  {
  path: '/product-subcategory',
  component: ProductSubcategoryComponent,
  data: {
      title: 'Categoria de producto',
      status: true
  }
  },
  {
  path: '/convert-list',
  component: ConvertListComponent,
  data: {
      title: 'Categoria de producto',
      status: true
  }
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
