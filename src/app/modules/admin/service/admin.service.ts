import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { UserStorageService } from 'src/app/auth/auth-services/storage-service/user-storage.service';

const BASIC_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  addCategory(categoryDto: any): Observable<any> {
    console.log(categoryDto);
    return this.http.post(`${BASIC_URL}api/admin/category`, categoryDto, {
      headers: this.createAuthorizationHeader(),
    })
  }

  getAllCategories(): Observable<any> {
    return this.http.get(`${BASIC_URL}api/admin/categories`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  addProduct(productDto: any): Observable<any> {
    return this.http.post<[]>(`${BASIC_URL}api/admin/product`, productDto, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      tap((_) => this.log('Product posted successfully')),
      catchError(this.handleError<[]>('Error posting Product', []))
    );
  }

  getAllProducts(): Observable<any> {
    return this.http.get<[]>(`${BASIC_URL}api/admin/products`, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      tap((_) => this.log('Products fetched successfully')),
      catchError(this.handleError<[]>('Error getting Products', []))
    );
  }

  getProductById(productId: any): Observable<any> {
    return this.http.get<[]>(`${BASIC_URL}api/admin/product/${productId}`, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      tap((_) => this.log('Product Fetched successfully')),
      catchError(this.handleError<[]>('Error Getting Product', []))
    );
  }

  getProductsByTitle(title: any): Observable<any> {
    return this.http.get<[]>(`${BASIC_URL}api/admin/search/${title}`, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      tap((_) => this.log('Products fetched successfully')),
      catchError(this.handleError<[]>('Error getting Products', []))
    );
  }

  deleteProductById(productId: any): Observable<any> {
    return this.http.delete<[]>(`${BASIC_URL}api/admin/product/${productId}`, {
      headers: this.createAuthorizationHeader(),
      observe: 'response'
    }).pipe(
      tap((_) => this.log('Product Deleted successfully')),
      catchError(this.handleError<[]>('Error Deleting Product', []))
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
    console.log(`Admin Service: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}
