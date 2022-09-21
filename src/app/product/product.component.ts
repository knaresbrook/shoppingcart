import { ToastrService } from 'ngx-toastr';
import { AccountsService } from './../accounts.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductsService } from './../products.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { products } from '../_models/products';
import {
  CellClickedEvent,
  ColDef,
  GridReadyEvent,
  GridSizeChangedEvent,
} from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { ButtonCellRenderer } from '../_renderer/button-cell-renderer.component';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products$: Observable<products[]>;

  public columnDefs: ColDef[] = [
    { field: 'id' },
    { field: 'code' },
    { field: 'description' },
    { field: 'price' },
    { field: 'stockqty' },
    { field: 'imageUrl', hide: true },
    { field: 'categoryid', hide: true },
    { field: 'categoryname' },
    {
      field: 'Add to Cart',
      width: 310,
      cellRenderer: ButtonCellRenderer,
      cellRendererParams: {
        clicked: (field: any) => {},
      },
    },
  ];

  public rowHeight = 46;

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  public rowData$!: Observable<products[]>;

  constructor(private productService: ProductsService) {}

  onGridReady(params: GridReadyEvent) {
    this.rowData$ = this.productService.GetAll();
  }

  onGridSizeChanged(params: GridSizeChangedEvent) {
    params.api.sizeColumnsToFit();
  }

  ngOnInit(): void {}

  GetById(id: Number) {
    this.products$ = this.productService.GetById(id);
  }

  // Example of consuming Grid Event
  // onCellClicked(e: CellClickedEvent): void {
  //   if (this.accountsService.getRoles == 'Admin')
  //     this.router.navigate(['/productdetails/' + e.data.id]);
  //   else
  //     this.toastr.info(
  //       'You are not administrator to edit product..',
  //       'Warning'
  //     );
  // }
  //

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  // Example using Grid's API
  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }
}
