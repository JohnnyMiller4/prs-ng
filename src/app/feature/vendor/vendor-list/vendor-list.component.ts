import { Component, OnInit } from '@angular/core';
import { Vendor } from 'src/app/model/vendor.class';
import { JsonResponse } from 'src/app/model/json-response.class';
import { VendorService } from 'src/app/service/vendor.service';
import { SystemService } from 'src/app/service/system.service';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent extends BaseComponent implements OnInit {
  title: string = "Vendor List";
  vendors: Vendor[] = [];
  jr: JsonResponse;

  constructor(private vendorSvc: VendorService,
              protected sysService: SystemService) {
    super(sysService);
  }
  ngOnInit() {
    super.ngOnInit();
    console.log("Calling vendor service list...");
    this.vendorSvc.list().subscribe(jresp => {
      this.jr = jresp;
      this.vendors = this.jr.data as Vendor[];
      console.log(this.vendors);
    });
  }

}
