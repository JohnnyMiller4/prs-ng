import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
//add Location
import { Location } from '@angular/common';
import { User } from 'src/app/model/user.class';
import { SystemService } from 'src/app/service/system.service';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent extends BaseComponent implements OnInit {
  title: string = "User Edit";
  user: User = new User();
  id: number = 0;
  isAdmin: boolean = false;
  validate: boolean = false;

  constructor(private userSvc: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private loc: Location,
    protected sysSvc: SystemService) {
    super(sysSvc);
  }

  ngOnInit() {
    super.ngOnInit();
    //get logged in user Admin status
    this.isAdmin = this.sysSvc.loggedInUser.isAdmin;

    this.route.params.subscribe(parms => this.id = parms['id']);
    this.userSvc.get(this.id).subscribe(jr => {
      this.user = jr.data as User;
    });
  }

  update() {
    this.validateData();
    if (this.validate == true) {
      this.userSvc.update(this.user).subscribe(jr => {
        console.log("edited user...");
        console.log(this.user);
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
    console.log("validate: ", this.validate)
  }
  
  backClicked() {
    this.loc.back();
  }

}
