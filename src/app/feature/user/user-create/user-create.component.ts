import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.class';
import { SystemService } from 'src/app/service/system.service';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent extends BaseComponent implements OnInit {
  title: String = "User Create";
  user: User = new User();

  constructor(private userSvc: UserService,
              private router: Router,
              protected sysSvc: SystemService) {
    super(sysSvc);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  save() {
    this.userSvc.save(this.user).subscribe(jr => {
      console.log("saved user...");
      console.log(this.user);
      this.router.navigateByUrl("/user/list");
    });
  }

}
