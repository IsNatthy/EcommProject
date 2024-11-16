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

  addToCart(productId: any): Observable<any> {
    const cartDto = {
      productId: productId,
      userId: UserStorageService.getUserId(),
    };
    return this.http.post<[]>(`${BASIC_URL}api/customer/cart`, cartDto, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      tap((_) => this.log('Product Added to Cart successfully')),
      catchError(this.handleError<[]>('Error adding Product to Cart', []))
    );
  }

  getCartByUserId(): Observable<any> {
    const userId = UserStorageService.getUserId();
    return this.http.get<[]>(`${BASIC_URL}api/customer/cart/${userId}`, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      tap((_) => this.log('Cart fetched successfully')),
      catchError(this.handleError<[]>('Error getting Cart', []))
    );
  }

  applyToken(code: any): Observable<any> {
    const userId = UserStorageService.getUserId();
    return this.http.get(`${BASIC_URL}api/customer/coupon/${userId}/${code}`, {
      headers: this.createAuthorizationHeader(),
    });
  }
  
  addMinusOnProduct(productId: any): Observable<any> {
    const quantityChangeProductDto = {
      userId: UserStorageService.getUserId(),
      productId: productId,
    };
    return this.http.post<[]>(`${BASIC_URL}api/customer/deduction`, quantityChangeProductDto, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      tap((_) => this.log('Remove Product from Order successfully')),
      catchError(this.handleError<[]>('Error removing Product from Order', []))
    );
  }

  addPlusOnProduct(productId: any): Observable<any> {
    const quantityChangeProductDto = {
      userId: UserStorageService.getUserId(),
      productId: productId,
    };
    return this.http.post<[]>(`${BASIC_URL}api/customer/addition`, quantityChangeProductDto, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      tap((_) => this.log('Added Product into Order successfully')),
      catchError(this.handleError<[]>('Error adding Product to Order', []))
    );
  }

  // Order service

  placeOrder(quantityChangeProductDto: any): Observable<any> {
    quantityChangeProductDto.userId = UserStorageService.getUserId();
    return this.http.post<[]>(`${BASIC_URL}api/customer/placeOrder`, quantityChangeProductDto, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      tap((_) => this.log('Order placed successfully')),
      catchError(this.handleError<[]>('Error placing Order', []))
    );
  }

  getMyOrdersByUserId(): Observable<any> {
    const userId = UserStorageService.getUserId();
    return this.http.get<[]>(`${BASIC_URL}api/customer/myOrders/${userId}`, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      tap((_) => this.log('My Orders fetched successfully')),
      catchError(this.handleError<[]>('Error getting My Orders', []))
    );
  }

  getOrderedProductsDetailsByOrderId(orderId: number): Observable<any> {
    return this.http.get<[]>(`${BASIC_URL}api/customer/ordered-products/${orderId}`, {
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
