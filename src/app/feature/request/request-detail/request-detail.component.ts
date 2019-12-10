import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Request } from 'src/app/model/request.class';
import { RequestLinesComponent } from '../request-lines/request-lines.component';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent extends BaseComponent implements OnInit {
  title: string = "Request Detail";
  request: Request = new Request();
  id: number = 0;

  constructor(private requestSvc: RequestService,
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
    });
  }

  delete() {
    this.requestSvc.delete(this.id).subscribe(jr => {
      if (jr.errors != null) {
        window.alert(jr.errors);
      }
      this.router.navigateByUrl("request/list");
    });
  }

}
