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

  constructor(private reqSvc: RequestService,
    protected sysSvc: SystemService,
    private router: Router) {
      super(sysSvc);
    }

  ngOnInit() {
    super.ngOnInit();
    this.request.user = this.sysSvc.loggedInUser;
    console.log(this.request);
  }

  save(): void {
    this.reqSvc.save(this.request).subscribe(jr => {
      console.log("saved request...");
      console.log(this.request);
      this.router.navigateByUrl("request/list");
    })
  }

}
