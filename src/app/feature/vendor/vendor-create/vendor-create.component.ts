import { Component, OnInit } from '@angular/core';
import { Vendor } from 'src/app/model/vendor.class';
import { VendorService } from 'src/app/service/vendor.service';
import { Router } from '@angular/router';
import { SystemService } from 'src/app/service/system.service';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-vendor-create',
  templateUrl: './vendor-create.component.html',
  styleUrls: ['./vendor-create.component.css']
})
export class VendorCreateComponent extends BaseComponent implements OnInit {
  title: String = "Vendor Create";
  vendor: Vendor = new Vendor();
  validate: boolean = false;


  constructor(private vendorSvc: VendorService,
    private router: Router,
    protected sysSvc: SystemService) {
    super(sysSvc);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  save() {
    this.validateData();
    if (this.validate == true) {
      this.vendorSvc.save(this.vendor).subscribe(jr => {
        console.log("saved vendors...");
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

}
