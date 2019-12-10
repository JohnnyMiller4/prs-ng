import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/model/request.class';
import { BaseComponent } from '../../base/base.component';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent extends BaseComponent implements OnInit {
  title: string = "Request List";
  requests: Request[] = [];
  request: Request = new Request();
  loggedInID: number = 0;

  constructor(private requestSvc: RequestService,
              protected sysSvc: SystemService) {
    super(sysSvc);
  }

  ngOnInit() {
    super.ngOnInit();
    //get logged in user id
    this.loggedInID = this.sysSvc.loggedInUser.id;
    //get request list
    this.requestSvc.list().subscribe(jr => {
      this.requests = jr.data as Request[];
    });
  }

}
