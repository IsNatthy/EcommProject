import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
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
import { ProfileComponent } from './components/profile/profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ImgDialogComponent } from './components/view-complete-product-detail/img-dialog/img-dialog.component';

@NgModule({
  declarations: [DashboardComponent, CartItemsComponent, OrderPlaceComponent, MyPlaceOrdersComponent, ViewOrderedProductsForReviewComponent, ReviewOrderedProductComponent, ViewCompleteProductDetailComponent, GetMyWishlistComponent, ProfileComponent, ChangePasswordComponent, ImgDialogComponent],
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