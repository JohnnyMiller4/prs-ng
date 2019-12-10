import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/service/request.service';
import { Router } from '@angular/router';
import { Request } from 'src/app/model/request.class';
import { SystemService } from 'src/app/service/system.service';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-request-create',
  templateUrl: './request-create.component.html',
  styleUrls: ['./request-create.component.css']
})
export class RequestCreateComponent extends BaseComponent implements OnInit {
  title: string = "Request Create";
  request: Request = new Request();
  validate: boolean = false;

  constructor(private reqSvc: RequestService,
    protected sysSvc: SystemService,
    private router: Router) {
      super(sysSvc);
    }

  ngOnInit() {
    super.ngOnInit();
    this.request.user = this.sysSvc.loggedInUser;
  }

  save(): void {
    this.validateData();
    if (this.validate == true) {
    this.reqSvc.save(this.request).subscribe(jr => {
      this.router.navigateByUrl("request/list");
    }); }
    else {
      window.alert("Error - incomplete or invalid data");
    }
  }

  validateData() {
    if(this.request.description&&this.request.justification
      &&this.request.deliveryMode != "") {
        this.validate = true;
      } else {
        this.validate = false;
      }
  }

}
