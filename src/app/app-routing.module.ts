import { PaymentsComponent } from './payments/payments.component';
import { BillshippingComponent } from './billshipping/billshipping.component';
import { AccountdetailsComponent } from './accountdetails/accountdetails.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { AdminComponent } from './admin/admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { ProductComponent } from './product/product.component';
import { AuthGuard } from './_guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'admin', component: AdminComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'product', component: ProductComponent },
  { path: 'productdetails/:id', component: ProductdetailsComponent },
  { path: 'productdetails', component: ProductdetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'shopping', component: ShoppingComponent },
  { path: 'accountdetails', component: AccountdetailsComponent },
  { path: 'billing', component: BillshippingComponent },
  { path: 'payments', component: PaymentsComponent },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
