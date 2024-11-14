import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, of } from 'rxjs';
import { UserStorageService } from 'src/app/auth/auth-services/storage-service/user-storage.service';

const BASIC_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getProductsByTitle(title: any): Observable<any> {
    return this.http.get<[]>(`${BASIC_URL}api/customer/search/${title}`, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      tap((_) => this.log('Products fetched successfully')),
      catchError(this.handleError<[]>('Error getting Products', []))
    );
  }

  getAllProducts(): Observable<any> {
    return this.http.get<[]>(`${BASIC_URL}api/customer/products`, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      tap((_) => this.log('Products fetched successfully')),
      catchError(this.handleError<[]>('Error getting Products', []))
    );
  }

  // Other methods

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization',
      'Bearer ' + UserStorageService.getToken()
    );
  }

  private log(message: string): void {
    console.log(`User Auth Service: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
