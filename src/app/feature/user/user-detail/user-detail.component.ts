import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.class';
import { UserService } from 'src/app/service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '../../base/base.component';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent extends BaseComponent implements OnInit {
  title: string = "User Detail";
  user: User = new User();
  id: number = 0;
  loggedInID: number = 0;

  constructor(private userSvc: UserService,
              private router: Router,
              private route: ActivatedRoute,
              protected sysSvc: SystemService) {
    super(sysSvc);
  }

  ngOnInit() {
    super.ngOnInit();
    //get logged in user id
    this.loggedInID = this.sysSvc.loggedInUser.id;

    this.route.params.subscribe(parms => this.id = parms['id']);
    this.userSvc.get(this.id).subscribe(jr => {
      this.user = jr.data as User;
    });
  }

  delete() {
    this.userSvc.delete(this.id).subscribe(jr => {
      if (jr.errors != null) {
        window.alert(jr.errors);
      }
      this.router.navigateByUrl("user/list");
    });
  }

}
