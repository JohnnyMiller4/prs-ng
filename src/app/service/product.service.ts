import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JsonResponse } from '../model/json-response.class';
import { Observable } from 'rxjs';
import { Product } from '../model/product.class';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url: string = "http://localhost:8080/products/";

  constructor(private http: HttpClient) { }

  list(): Observable<JsonResponse> {
    return this.http.get(this.url) as Observable<JsonResponse>;
  }

  //add save() method.
  //Replace "product: Product" with whatever!
  save(product: Product): Observable<JsonResponse> {
    return this.http.post(this.url, product) as Observable<JsonResponse>;
  }

  //add get() method
  get(id: number): Observable<JsonResponse> {
    return this.http.get(this.url + id) as Observable<JsonResponse>;
  }

  delete(id: number): Observable<JsonResponse> {
    return this.http.delete(this.url + id) as Observable<JsonResponse>;
  }
}
