import { Component, inject, Input } from '@angular/core';
import { Product } from '../../models/product.interface';
import { AsyncPipe, CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-detail',
  imports: [UpperCasePipe, CurrencyPipe, DatePipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);

  product: Product;

  deleteProduct(): void {
    this
      .productService
      .deleteProduct(this.product.id)
      .subscribe({
        next: () => {
          console.log('Product deleted successfully');
          this.productService.resetList();
          this.router.navigate(['/products']);
        },
        error: (error) => {
          console.error('Error deleting product:', error);
        }
      });
  }

  constructor() {
    let id = this.activatedRoute.snapshot.params.id;

    this.productService
      .getProductById(id)
      .pipe(
        takeUntilDestroyed()
      )
      .subscribe(product => this.product = product);
  }
}
