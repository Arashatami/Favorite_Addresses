import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Address } from '../../models/Address';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private _publicAddresses$: BehaviorSubject<Address[]> = new BehaviorSubject([]);

  public get publicAddresses(): Observable<Address[]> {
    return this._publicAddresses$.asObservable();
  }

  constructor(
    private http: HttpClient,
  ) {
    this.getAllPublicAddresses().subscribe();
  }

  private getAllPublicAddresses(): Observable<Address[]> {
    return this.http.get(`${environment.mockServer}/public-addresses`).pipe(map(res => {
      this._publicAddresses$.next(res as Address[]);
      return res as Address[];
    }));
  }

  public createPublicAddress(address: Address): Observable<Address> {
    return this.http.post(`${environment.mockServer}/public-addresses`, address).pipe(map(res => res as Address), finalize(() => {
      this.getAllPublicAddresses().subscribe();
    }));
  }

  public editPublicAddress(address: Address, id: number): Observable<Address> {
    return this.http.post(`${environment.mockServer}/public-addresses/${id}`, address).pipe(map(res => res as Address), finalize(() => {
      this.getAllPublicAddresses().subscribe();
    }));
  }

  public getPublicAddressDetail(id: number): Observable<Address> {
    return this.http.get(`${environment.mockServer}/public-addresses/${id}`).pipe(map(res => res as Address), finalize(() => {
      this.getAllPublicAddresses().subscribe();
    }));
  }

  public deletePublicAddress(id: number): Observable<{}> {
    return this.http.delete(`${environment.mockServer}/public-addresses/${id}`).pipe(map(res => res as {}), finalize(() => {
      this.getAllPublicAddresses().subscribe();
    }));
  }


}
