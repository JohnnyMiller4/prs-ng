import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { RequestService } from 'src/app/service/request.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SystemService } from 'src/app/service/system.service';
import { Request } from 'src/app/model/request.class';
import { User } from 'src/app/model/user.class';
import { UserService } from 'src/app/service/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-request-edit',
  templateUrl: './request-edit.component.html',
  styleUrls: ['./request-edit.component.css']
})
export class RequestEditComponent extends BaseComponent implements OnInit {
  title: string = 'Request Edit';
  request: Request = new Request();
  users: User[] = [];
  id: number = 0;

  constructor(private requestSvc: RequestService,
              private router: Router,
              private route: ActivatedRoute,
              private userSvc: UserService,
              private loc: Location,
              protected sysSvc: SystemService) {
    super(sysSvc);
  }

  ngOnInit() {
    super.ngOnInit();
    this.route.params.subscribe(parms => this.id = parms['id']);
    //get request for the id passed in
    this.requestSvc.get(this.id).subscribe(jr => {
      this.request = jr.data as Request;
      console.log("Request to edit: ", this.request)
    });
    //populate list of users
    this.userSvc.list().subscribe(jr => {
      this.users = jr.data as User[];
      console.log("users: ", this.users)
    });
  }

  update(): void {
    this.requestSvc.update(this.request).subscribe(jr => {
      console.log("updated request...");
      console.log(this.request);
      this.router.navigateByUrl("request/list");
    });
    }

    compUser(a: User, b: User): boolean {
      return a && b && a.id == b.id;
    }

    backClicked() {
      this.loc.back();
    }
}
