import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.class';
import { Vendor } from 'src/app/model/vendor.class';
import { ProductService } from 'src/app/service/product.service';
import { VendorService } from 'src/app/service/vendor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SystemService } from 'src/app/service/system.service';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent extends BaseComponent implements OnInit {
  title: string = 'Product Edit';
  product: Product = new Product();
  vendors: Vendor[] = [];
  id: number = 0;
  validate: boolean = false;

  constructor(private productSvc: ProductService,
    private vendorSvc: VendorService,
    private router: Router,
    private route: ActivatedRoute,
    private loc: Location,
    protected sysSvc: SystemService) {
    super(sysSvc);
  }

  ngOnInit() {
    super.ngOnInit();
    this.route.params.subscribe(parms => this.id = parms['id']);
    //get product for the id passed in
    this.productSvc.get(this.id).subscribe(jr => {
      this.product = jr.data as Product;
    });
    //populate list of vendors
    this.vendorSvc.list().subscribe(jr => {
      this.vendors = jr.data as Vendor[];
    });
  }

  update(): void {
    this.validateData();
    if (this.validate == true) {
      this.productSvc.update(this.product).subscribe(jr => {
        this.router.navigateByUrl("product/list");
      });
    } else {
      window.alert("Error - incomplete or invalid data");
    }
  }

  validateData() {
    if (this.product.price != null && this.product.partNumber
      && this.product.name && this.product.unit != ""
      && this.product.vendor.id&&this.product.price != 0) {
      this.validate = true;
    } else {
      this.validate = false;
    }
  }

  compVendor(a: Vendor, b: Vendor): boolean {
    return a && b && a.id == b.id;
  }

  backClicked() {
    this.loc.back();
  }

}
