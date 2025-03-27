import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-insert',
  imports: [FormsModule],
  templateUrl: './product-insert.component.html',
  styleUrl: './product-insert.component.css'
})
export class ProductInsertComponent {

  private productService = inject(ProductService);
  private router = inject(Router);

  onSubmit(newProduct: Product) {
    this
      .productService
      .insertProduct(newProduct)
      .subscribe(
        {
          next: (product) => {
            console.log('Product inserted:', product);
            this.productService.resetList();
            this.router.navigate(['products']);
          },
          error: (error) => {
              console.error('Error inserting product:', error);
          }
        }
      );
  }

}
