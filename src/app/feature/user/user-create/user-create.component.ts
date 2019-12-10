import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.class';
import { SystemService } from 'src/app/service/system.service';
import { BaseComponent } from '../../base/base.component';
import { disableDebugTools } from '@angular/platform-browser';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent extends BaseComponent implements OnInit {
  title: String = "User Create";
  user: User = new User();
  validate: boolean = false;

  constructor(private userSvc: UserService,
    private router: Router,
    protected sysSvc: SystemService) {
    super(sysSvc);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  save() {
    this.validateData();
    if (this.validate == true) {
      this.userSvc.save(this.user).subscribe(jr => {
        this.router.navigateByUrl("/user/list");
      });
    } else {
      window.alert("Error - incomplete or invalid data");
    }
  }

  validateData() {
    if (this.user.username&&this.user.password&&
      this.user.firstName&&this.user.lastName&&
      this.user.phoneNumber&&this.user.email != "") {
      this.validate = true;
    } else {
      this.validate = false;
    }
  }
}
