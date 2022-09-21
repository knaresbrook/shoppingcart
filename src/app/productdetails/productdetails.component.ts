import { AccountsService } from './../accounts.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../category.service';
import { first } from 'rxjs';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css'],
})
export class ProductdetailsComponent implements OnInit {
  form: FormGroup;
  id: any;
  isAddMode: boolean;
  submitted = false;
  categories: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductsService,
    public categoryService: CategoryService,
    public accountService: AccountsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      code: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      stockqty: ['', Validators.required],
      imageUrl: ['', Validators.required],
      categoryid: ['', Validators.required],
    });

    this.categoryService.GetAll().subscribe({
      next: (val) => {
        this.categories = val;
      },
    });

    if (!this.isAddMode) {
      this.productService
        .GetById(this.id)
        .pipe(first())
        .subscribe((x) => this.form.patchValue(x));
    }
  }

  changeCategory(e: any) {
    this.Category?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  get Category() {
    return this.form.get('categoryid');
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    if (this.isAddMode) {
      this.AddProduct();
    } else {
      this.UpdateProduct(this.id);
    }
  }

  private AddProduct() {
    this.productService.InsertProduct(this.form.value).subscribe({
      next: () => {
        this.toastr.success('Information', 'Product Added Successfully');
        this.form.reset();
        let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        this.router.navigate([returnUrl || '/']);
      },
      error: (error) => {
        this.toastr.error('Error...', error);
      },
    });
  }

  private UpdateProduct(id: number) {
    this.productService.UpdateProduct(id, this.form.value).subscribe({
      next: () => {
        this.toastr.success('Information', 'Product Edited Successfully');
        this.form.reset();
        let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        this.router.navigate([returnUrl || '/']);
      },
      error: (error) => {
        this.toastr.error('Error...', error);
      },
    });
  }
}
