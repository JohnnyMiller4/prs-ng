import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JsonResponse } from '../model/json-response.class';
import { Observable } from 'rxjs';
import { Request } from 'src/app/model/request.class';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  url: string = "http://localhost:8080/requests/";

  constructor(private http: HttpClient) { }

  list(): Observable<JsonResponse> {
    return this.http.get(this.url) as Observable<JsonResponse>;
  }

  listReview(id: number): Observable<JsonResponse> {
    return this.http.get(this.url+"list-review/"+ id) as Observable<JsonResponse>;
  }

  save(request: Request): Observable<JsonResponse> {
    return this.http.post(this.url, request) as Observable<JsonResponse>;
  }

  update(request: Request): Observable<JsonResponse> {
    return this.http.put(this.url, request) as Observable<JsonResponse>;
  }

  get(id: number): Observable<JsonResponse> {
    return this.http.get(this.url + id) as Observable<JsonResponse>;
  }

  delete(id: number): Observable<JsonResponse> {
    return this.http.delete(this.url + id) as Observable<JsonResponse>;
  }

  submitRev(request: Request): Observable<JsonResponse> {
    return this.http.put(this.url + "/submit-review", request) as Observable<JsonResponse>;
  }

  approveReq(request: Request): Observable<JsonResponse> {
    return this.http.put(this.url + "/approve", request) as Observable<JsonResponse>;
  }
  
  rejectReq(request: Request): Observable<JsonResponse> {
    return this.http.put(this.url + "/reject", request) as Observable<JsonResponse>;
  }
}
