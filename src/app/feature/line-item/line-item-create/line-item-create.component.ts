import { Component, OnInit } from '@angular/core';
import { LineItem } from 'src/app/model/line-item.class';
import { Product } from 'src/app/model/product.class';
import { BaseComponent } from '../../base/base.component';
import { LineItemService } from 'src/app/service/line-item.service';
import { ProductService } from 'src/app/service/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SystemService } from 'src/app/service/system.service';
import { RequestService } from 'src/app/service/request.service';
import { Request } from 'src/app/model/request.class';

@Component({
  selector: 'app-line-item-create',
  templateUrl: './line-item-create.component.html',
  styleUrls: ['./line-item-create.component.css']
})
export class LineItemCreateComponent extends BaseComponent implements OnInit {
  title: string = "Line-Item Create";
  lineItem: LineItem = new LineItem();
  request: Request = new Request;
  products: Product[] = [];
  id: number = 0;

  constructor(private liSvc: LineItemService,
              private productSvc: ProductService,
              private requestSvc: RequestService,
              private router: Router,
              private route: ActivatedRoute,
              protected sysSvc: SystemService) {
  super(sysSvc);
}

  ngOnInit() {
    super.ngOnInit();
    //populate products
    this.productSvc.list().subscribe(jr => {
      this.products = jr.data as Product[];
      console.log("products: ",this.products)
    });
    //get requests by ID
    this.route.params.subscribe(parms => this.id = parms['id']);
    this.requestSvc.get(this.id).subscribe(jr => {
      this.request = jr.data as Request;
  });
}

  save(): void {
    this.lineItem.request = this.request;
    this.liSvc.save(this.lineItem).subscribe(jr => {
      console.log("saved line item...");
      console.log(this.lineItem);
    this.router.navigateByUrl("/request/lines/"+this.id);
    });
  }

}
