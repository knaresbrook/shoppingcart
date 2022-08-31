import { AccountsService } from './../accounts.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  model: any = {};
  errorMessage: string;
  showError = false;

  constructor(
    public accountService: AccountsService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  login(logForm: NgForm) {
    this.accountService.login(this.model).subscribe({
      next: (user) => {
        this.toastr.success('Information', 'Login successfull...');
        logForm.reset();
        let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        this.router.navigate([returnUrl || '/']);
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.message;
        this.showError = true;
      },
    });
  }

  logout() {
    this.accountService.logout().subscribe({
      next: () => {
        this.model = {};
        this.router.navigateByUrl('login');
      },
    });
  }

  ngOnDestroy(): void {
    this.model;
  }
}
