import { ShoppingCartService } from './shoppingcart.service';
import { MessageService } from './message.service';
import { ProductsService } from './products.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { ProductComponent } from './product/product.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { AccountsService } from './accounts.service';
import { Interceptor } from './_interceptors/Interceptor';
import { AuthGuard } from './_guards/auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AdminComponent } from './admin/admin.component';
import { CategoryComponent } from './category/category.component';
import { AgGridModule } from 'ag-grid-angular';
import { AuthloginGuard } from './_guards/authlogin.guard';
import { ToastrModule } from 'ngx-toastr';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { CategoryService } from './category.service';
import { ButtonCellRenderer } from './_renderer/button-cell-renderer.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { AccountdetailsComponent } from './accountdetails/accountdetails.component';
import { BillshippingComponent } from './billshipping/billshipping.component';
import { PaymentsComponent } from './payments/payments.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    NavComponent,
    ProductComponent,
    HomeComponent,
    ErrorComponent,
    AdminComponent,
    CategoryComponent,
    ProductdetailsComponent,
    ButtonCellRenderer,
    ShoppingComponent,
    AccountdetailsComponent,
    BillshippingComponent,
    PaymentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    AgGridModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    AccountsService,
    ProductsService,
    CategoryService,
    MessageService,
    ShoppingCartService,
    AuthloginGuard,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
