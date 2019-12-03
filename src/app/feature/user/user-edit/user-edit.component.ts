import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
//add Location
import { Location } from '@angular/common';
import { User } from 'src/app/model/user.class';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  title: string = "User Edit";
  user: User = new User();
  id: number = 0;

  constructor(private userSvc: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private loc: Location) { }

  ngOnInit() {
    this.route.params.subscribe(parms => this.id = parms['id']);
    this.userSvc.get(this.id).subscribe(jr => {
      this.user = jr.data as User;
    });
  }

  save() {
    this.userSvc.save(this.user).subscribe(jr => {
      console.log("edited user...");
      console.log(this.user);
      this.router.navigateByUrl("/user/list");
    });
  }

  backClicked() {
    this.loc.back();
  }

}
