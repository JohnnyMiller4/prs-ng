import { Component, OnInit } from '@angular/core';
import { SystemService } from 'src/app/service/system.service';
import { BaseComponent } from '../../base/base.component';
import { LineItem } from 'src/app/model/line-item.class';
import { Request } from 'src/app/model/request.class';
import { LineItemService } from 'src/app/service/line-item.service';
import { RequestService } from 'src/app/service/request.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-request-approve',
  templateUrl: './request-approve.component.html',
  styleUrls: ['./request-approve.component.css']
})
export class RequestApproveComponent extends BaseComponent implements OnInit {
  title: string = "Request Approve/Reject";
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
    this.requestSvc.get(this.id).subscribe(jr => {
      this.request = jr.data as Request;
    })
    //call line item list
    console.log("Calling line item list...");
    this.liSvc.linesForRequest(this.id).subscribe(jr => {
      console.log("jr: ", jr);
      this.lineItems = jr.data as LineItem[];
      console.log("this.lineItems:", this.lineItems);
    })
  }

  approve(request: Request) {
    this.requestSvc.approveReq(this.request).subscribe(jr => {
      console.log("approved request...");
      console.log(this.request);
      console.log("approve request review jr:", jr);
      if (jr.errors != null) {
        console.log("Error submitting review: "+jr.errors)
      }
      this.router.navigateByUrl("request/review");
    });
  }

    reject(request: Request) {
      this.requestSvc.rejectReq(this.request).subscribe(jr => {
        console.log("rejected request...");
        console.log(this.request);
        console.log("submit request review jr:", jr);
        if (jr.errors != null) {
          console.log("Error submitting review: "+jr.errors)
        }
        this.router.navigateByUrl("request/review");
      });

  }
}
