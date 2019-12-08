import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from '../feature/user/user-list/user-list.component';
import { UserEditComponent } from '../feature/user/user-edit/user-edit.component';
import { UserCreateComponent } from '../feature/user/user-create/user-create.component';
import { UserDetailComponent } from '../feature/user/user-detail/user-detail.component';
import { VendorCreateComponent } from '../feature/vendor/vendor-create/vendor-create.component';
import { VendorListComponent } from '../feature/vendor/vendor-list/vendor-list.component';
import { VendorEditComponent } from '../feature/vendor/vendor-edit/vendor-edit.component';
import { VendorDetailComponent } from '../feature/vendor/vendor-detail/vendor-detail.component';
import { ProductListComponent } from '../feature/product/product-list/product-list.component';
import { ProductCreateComponent } from '../feature/product/product-create/product-create.component';
import { ProductEditComponent } from '../feature/product/product-edit/product-edit.component';
import { ProductDetailComponent } from '../feature/product/product-detail/product-detail.component';
import { RequestListComponent } from '../feature/request/request-list/request-list.component';
import { UserLoginComponent } from '../feature/user/user-login/user-login.component';
import { RequestCreateComponent } from '../feature/request/request-create/request-create.component';
import { RequestDetailComponent } from '../feature/request/request-detail/request-detail.component';
import { RequestEditComponent } from '../feature/request/request-edit/request-edit.component';
import { RequestLinesComponent } from '../feature/request/request-lines/request-lines.component';
import { LineItemEditComponent } from '../feature/line-item/line-item-edit/line-item-edit.component';
import { LineItemCreateComponent } from '../feature/line-item/line-item-create/line-item-create.component';
import { RequestReviewComponent } from '../feature/request/request-review/request-review.component';
import { RequestApproveComponent } from '../feature/request/request-approve/request-approve.component';


const routes: Routes = [
  {path: '', redirectTo: '/user/login', pathMatch: 'full'},
  {path: 'home', component: UserListComponent},
  //user CRUD
  {path: 'user/login', component: UserLoginComponent},
  {path: 'user/list', component: UserListComponent},
  {path: 'user/create', component: UserCreateComponent},
  {path: 'user/edit/:id', component: UserEditComponent},
  {path: 'user/detail/:id', component: UserDetailComponent},
  //vendor CRUD
  {path: 'vendor/list', component: VendorListComponent},
  {path: 'vendor/create', component: VendorCreateComponent},
  {path: 'vendor/edit/:id', component: VendorEditComponent},
  {path: 'vendor/detail/:id', component: VendorDetailComponent},
  //product CRUD
  {path: 'product/list', component: ProductListComponent},
  {path: 'product/create', component: ProductCreateComponent},
  {path: 'product/edit/:id', component: ProductEditComponent},
  {path: 'product/detail/:id', component: ProductDetailComponent},
  //request CRUD
  {path: 'request/list', component: RequestListComponent},
  {path: 'request/create', component: RequestCreateComponent},
  {path: 'request/edit/:id', component: RequestEditComponent},
  {path: 'request/detail/:id', component: RequestDetailComponent},
  {path: 'request/lines/:id', component: RequestLinesComponent},
  {path: 'request/review', component: RequestReviewComponent},
  {path: 'request/review/:id', component: RequestApproveComponent},
  //line-items CRUD
  {path: 'lineitem/edit/:id', component: LineItemEditComponent},
  {path: 'lineitem/create/:id', component: LineItemCreateComponent},
  // '**' = catch all. Displays component as default page
  {path: '**', component: UserLoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
