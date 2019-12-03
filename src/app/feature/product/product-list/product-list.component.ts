import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.class';
import { ProductService } from 'src/app/service/product.service';
import { BaseComponent } from '../../base/base.component';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent extends BaseComponent implements OnInit {
  title: string = "Product List";
  products: Product[] = [];

  constructor(private productSvc: ProductService) {
    super();
   }

  ngOnInit() {
    super.ngOnInit;
    console.log("Calling product list...");
    this.productSvc.list().subscribe(jr => {
      console.log("jr: ",jr);
      this.products = jr.data as Product[];
    });
  }

}
