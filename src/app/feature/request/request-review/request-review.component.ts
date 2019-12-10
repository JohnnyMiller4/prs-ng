import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/model/user.class';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-request-review',
  templateUrl: './request-review.component.html',
  styleUrls: ['./request-review.component.css']
})
export class RequestReviewComponent extends BaseComponent implements OnInit {
  title: "Purchase Request Review";
  requests: Request[] = [];
  id: number = 0;

  constructor(private requestSvc: RequestService,
              protected sysService: SystemService,) {
    super(sysService);
  }

  ngOnInit() {
    super.ngOnInit();
    //get logged in user id
    this.id = this.sysService.loggedInUser.id;
    //get review list
    this.requestSvc.listReview(this.id).subscribe(jr => {
      this.requests = jr.data as Request[]
    });
  }

}
