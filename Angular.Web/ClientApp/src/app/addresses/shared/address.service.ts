import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private apiURL = this.baseUrl + "api/addresses";

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  deleteAddresses(ids: number[]): Observable<void> {
    return this.http.post<void>(this.apiURL + '/delete/list', ids);
  }
}
