import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
  ) { }

  private getAllPublicAddresses(): Observable<Address[]> {
    return this.http.get(`${environment.mockServer}/`).pipe(map(res => res as Address[])).subscribe(res => {
      this._publicAddresses$.next(res);
    });
  }

  public createPublicAddress(address: Address): Observable<Address> {
    return this.http.post(`${environment.mockServer}/`, address).pipe(map(res => res as Address));
  }

  public editPublicAddress(address: Address, id: number): Observable<Address> {
    return this.http.post(`${environment.mockServer}/${id}`, address).pipe(map(res => res as Address));
  }

  public getPublicAddressDetail(id: number): Observable<Address> {
    return this.http.get(`${environment.mockServer}/${id}`).pipe(map(res => res as Address));
  }

  public deletePublicAddress(id: number): Observable<{}> {
    return this.http.delete(`${environment.mockServer}/${id}`).pipe(map(res => res as {}));
  }


}
