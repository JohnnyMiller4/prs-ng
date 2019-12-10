import { Component, OnInit } from '@angular/core';
import { Vendor } from 'src/app/model/vendor.class';
import { VendorService } from 'src/app/service/vendor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BaseComponent } from '../../base/base.component';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-vendor-edit',
  templateUrl: './vendor-edit.component.html',
  styleUrls: ['./vendor-edit.component.css']
})
export class VendorEditComponent extends BaseComponent implements OnInit {
  title: string = "Vendor Edit";
  vendor: Vendor = new Vendor();
  id: number = 0;
  validate: boolean = false;

  constructor(private vendorSvc: VendorService,
              private router: Router,
              private route: ActivatedRoute,
              private loc: Location,
              protected sysSvc: SystemService) {
    super(sysSvc);
  }

  ngOnInit() {
    super.ngOnInit();
    this.route.params.subscribe(parms => this.id = parms['id']);
    this.vendorSvc.get(this.id).subscribe(jr => {
      this.vendor = jr.data as Vendor;
    });
  }

  update() {
    this.validateData();
    if (this.validate == true) {
    this.vendorSvc.update(this.vendor).subscribe(jr => {
      console.log("edited vendor...");
      console.log(this.vendor);
      this.router.navigateByUrl("/vendor/list");
    });
  } else {
    window.alert("Error - incomplete or invalid data");
  }
  }

  validateData() {
    if (this.vendor.code && this.vendor.name
      && this.vendor.address && this.vendor.city
      && this.vendor.state && this.vendor.zip
      && this.vendor.phoneNumber && this.vendor.email != "") {
      this.validate = true;
    } else {
      this.validate = false;
    }
    console.log("validate: ", this.validate)
  }

    backClicked() {
    this.loc.back();
  }

}
