import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/model/request.class';
import { BaseComponent } from '../../base/base.component';
import { RequestService } from 'src/app/service/request.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent extends BaseComponent implements OnInit {
  title: string = "Request List";
  requests: Request[] = [];

  constructor(private requestSvc: RequestService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit;
    console.log("Calling request list...");
    this.requestSvc.list().subscribe(jr => {
      console.log("jr: ",jr);
      this.requests = jr.data as Request[];
    })
  }

}
