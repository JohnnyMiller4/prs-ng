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

  constructor(private vendorSvc: VendorService,
              private router: Router,
              protected sysSvc: SystemService) {
    super(sysSvc);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  save() {
    this.vendorSvc.save(this.vendor).subscribe(jr => {
      console.log("saved vendors...");
      console.log(this.vendor);
      this.router.navigateByUrl("/vendor/list");
    })
  }

}
