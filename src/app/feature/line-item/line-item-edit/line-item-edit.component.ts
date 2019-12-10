import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { LineItemService } from 'src/app/service/line-item.service';
import { SystemService } from 'src/app/service/system.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LineItem } from 'src/app/model/line-item.class';
import { Product } from 'src/app/model/product.class';
import { ProductService } from 'src/app/service/product.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-line-item-edit',
  templateUrl: './line-item-edit.component.html',
  styleUrls: ['./line-item-edit.component.css']
})
export class LineItemEditComponent extends BaseComponent implements OnInit {
  title: string = 'Line Item Edit';
  lineItem: LineItem = new LineItem();
  products: Product[] = [];
  id: number = 0;
  validated: boolean = false;

  constructor(private liSvc: LineItemService,
    private productSvc: ProductService,
    protected sysSvc: SystemService,
    private router: Router,
    private route: ActivatedRoute,
    private loc: Location) {
    super(sysSvc);
  }

  ngOnInit() {
    super.ngOnInit();
    this.route.params.subscribe(parms => this.id = parms['id']);
    //get line-item for the id passed in
    this.liSvc.get(this.id).subscribe(jr => {
      this.lineItem = jr.data as LineItem;
      console.log("Line-Item to edit: ", this.lineItem)
    });
    //populate list of products
    this.productSvc.list().subscribe(jr => {
      this.products = jr.data as Product[];
      console.log("products: ", this.products)
    });
  }

  update(): void {
    this.validateData();
    if (this.validated == true) {
      this.liSvc.update(this.lineItem).subscribe(jr => {
        console.log("updated lineItems...");
        console.log(this.lineItem);
        this.backClicked();
      })
    } else {
      window.alert("Error - incomplete or invalid data");
    }
  };

  validateData() {
    console.log(this.lineItem.product);
    if (this.lineItem.quantity > 0 && this.lineItem.product.id != 0) {
      this.validated = true;
    } else {
      this.validated = false;
    }
  }

  compProduct(a: Product, b: Product): boolean {
    return a && b && a.id == b.id;
  }

  backClicked() {
    this.loc.back();
  }

}
