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

  products$ = this
                .http
                .get<Product[]>(this.baseUrl)
                .pipe(
                  delay(1500), // For the demo
                  tap(console.table)
                )

}
