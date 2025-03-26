import { Component, inject, signal, computed, effect } from '@angular/core';
import { Product } from '../../models/product.interface';
import { AsyncPipe, CurrencyPipe, SlicePipe, UpperCasePipe } from '@angular/common';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  imports: [UpperCasePipe, CurrencyPipe, ProductDetailComponent, AsyncPipe, SlicePipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  productService = inject(ProductService);

  title = signal('Product List');
  selectedProduct: Product;
  products$: Observable<Product[]> = this.productService.products$

  // Pagination
  pageSize = 5;
  start = 0;
  end = this.pageSize;
  pageNumber = 1;

  previousPage() {
    this.start -= this.pageSize;
    this.end -= this.pageSize;
    this.pageNumber--;
  }

  nextPage() {
    this.start += this.pageSize;
    this.end += this.pageSize;
    this.pageNumber++;
  }

  onSelect(product: Product): void {
    this.selectedProduct = product;
  }
}
