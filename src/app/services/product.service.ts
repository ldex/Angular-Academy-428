import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError, delay, shareReplay, tap, map } from 'rxjs';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'https://671d383409103098807c943e.mockapi.io/api/products/';

  private http = inject(HttpClient);

  products$: Observable<Product[]>;

  constructor() {
    this.initProducts();
  }

  resetList() {
    this.initProducts();
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl + id);
  }

  insertProduct(newProduct: Product): Observable<Product> {
    newProduct.modifiedDate = new Date();
    return this.http.post<Product>(this.baseUrl, newProduct);
  }

  private initProducts() {
    this.products$ = this
      .http
      .get<Product[]>(this.baseUrl)
      .pipe(
        tap(console.table),
        shareReplay()
      )
  }

  getProductById(id: number): Observable<Product> {
     return this
              .products$
              .pipe(
                map(products => products.find(product => product.id === id))
              )
  }

}
