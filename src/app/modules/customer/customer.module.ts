import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DemoAngularMaterialModule } from 'src/app/DemoAngularMaterialModule';
import { CartItemsComponent } from './components/cart-items/cart-items.component';
import { OrderPlaceComponent } from './components/order-place/order-place.component';
import { MyPlaceOrdersComponent } from './components/my-place-orders/my-place-orders.component';
import { ViewOrderedProductsForReviewComponent } from './components/view-ordered-products-for-review/view-ordered-products-for-review.component';
import { ReviewOrderedProductComponent } from './components/review-ordered-product/review-ordered-product.component';
import { ViewCompleteProductDetailComponent } from './components/view-complete-product-detail/view-complete-product-detail.component';
import { GetMyWishlistComponent } from './components/get-my-wishlist/get-my-wishlist.component';

@NgModule({
  declarations: [CustomerComponent, DashboardComponent, CartItemsComponent, OrderPlaceComponent, MyPlaceOrdersComponent, ViewOrderedProductsForReviewComponent, ReviewOrderedProductComponent, ViewCompleteProductDetailComponent, GetMyWishlistComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DemoAngularMaterialModule,
  ]
})
export class CustomerModule { }