import { Component, inject, signal, computed, effect } from '@angular/core';
import { Product } from '../../models/product.interface';
import { AsyncPipe, CurrencyPipe, SlicePipe, UpperCasePipe } from '@angular/common';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [UpperCasePipe, CurrencyPipe, AsyncPipe, SlicePipe, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  private productService = inject(ProductService);
  private router = inject(Router);

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
    this.selectedProduct = null;
  }

  nextPage() {
    this.start += this.pageSize;
    this.end += this.pageSize;
    this.pageNumber++;
    this.selectedProduct = null;
  }

  onSelect(product: Product): void {
    this.selectedProduct = product;
    this.router.navigate(['/products', product.id]);
  }
}
