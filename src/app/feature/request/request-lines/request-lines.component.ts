import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { SystemService } from 'src/app/service/system.service';
import { Request } from 'src/app/model/request.class';
import { RequestService } from 'src/app/service/request.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LineItem } from 'src/app/model/line-item.class';
import { LineItemService } from 'src/app/service/line-item.service';

@Component({
  selector: 'app-request-lines',
  templateUrl: './request-lines.component.html',
  styleUrls: ['./request-lines.component.css']
})
export class RequestLinesComponent extends BaseComponent implements OnInit {
  title: string = "Request Detail";
  request: Request = new Request();
  lineItems: LineItem[] = [];
  id: number = 0;

  constructor(private requestSvc: RequestService,
              private liSvc: LineItemService,
              private router: Router,
              private route: ActivatedRoute,
              protected sysSvc: SystemService) {
    super(sysSvc);
  }

  ngOnInit() {
    super.ngOnInit();
    this.route.params.subscribe(parms => this.id = parms['id']);
    this.refreshPage();
  }

  refreshPage() {
    this.requestSvc.get(this.id).subscribe(jr => {
      this.request = jr.data as Request;
    });
    //call line item list
    console.log("Calling line item list...");
    this.liSvc.linesForRequest(this.id).subscribe(jr => {
      console.log("jr: ", jr);
      this.lineItems = jr.data as LineItem[];
      console.log("this.lineItems:", this.lineItems);
    })
  }

  delete(id: number) {
    this.liSvc.delete(id).subscribe(jr => {
      console.log("request delete jr: ", jr);
      if (jr.errors != null) {
        console.log("Error deleting request: "+jr.errors)
      }
      this.refreshPage();
    });
  }

  submitRev(request: Request) {
    this.requestSvc.submitRev(this.request).subscribe(jr => {
      console.log("submit request review jr:", jr);
      if (jr.errors != null) {
        console.log("Error submitting review: "+jr.errors)
      }
      this.router.navigateByUrl("request/list");
    });
  }
}
