import { Observable } from 'rxjs';
import { ProductsService } from './../products.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { products } from '../_models/products';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
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
    { field: 'imageUrl' },
    { field: 'categoryId' },
    { field: 'category' },
  ];

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  public rowData$!: Observable<products[]>;

  constructor(private productService: ProductsService) {}

  onGridReady(params: GridReadyEvent) {
    this.rowData$ = this.productService.GetAll();
  }

  ngOnInit(): void {}

  GetById(id: Number) {
    this.products$ = this.productService.GetById(id);
  }

  // Example of consuming Grid Event
  onCellClicked(e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  // Example using Grid's API
  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }
}
