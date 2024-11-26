import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CartItemsComponent } from './components/cart-items/cart-items.component';
import { OrderPlaceComponent } from './components/order-place/order-place.component';
import { MyPlaceOrdersComponent } from './components/my-place-orders/my-place-orders.component';
import { ViewOrderedProductsForReviewComponent } from './components/view-ordered-products-for-review/view-ordered-products-for-review.component';
import { ReviewOrderedProductComponent } from './components/review-ordered-product/review-ordered-product.component';
import { ViewCompleteProductDetailComponent } from './components/view-complete-product-detail/view-complete-product-detail.component';
import { GetMyWishlistComponent } from './components/get-my-wishlist/get-my-wishlist.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CustomerGuard } from 'src/app/auth/auth-guards/auth-customer/customer.guard';
import { AboutUsComponent } from 'src/app/auth/auth-components/about-us/about-us.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [CustomerGuard] },
  { path: 'cart', component: CartItemsComponent, canActivate: [CustomerGuard] },
  { path: 'my_orders', component: MyPlaceOrdersComponent, canActivate: [CustomerGuard] },
  { path: 'ordered_products/:orderId', component: ViewOrderedProductsForReviewComponent, canActivate: [CustomerGuard] },
  { path: 'place-order', component: OrderPlaceComponent, canActivate: [CustomerGuard] },
  { path: 'review/:productId', component: ReviewOrderedProductComponent, canActivate: [CustomerGuard] },
  { path: 'product/:productId', component: ViewCompleteProductDetailComponent, canActivate: [CustomerGuard] },
  { path: 'wishlist', component: GetMyWishlistComponent, canActivate: [CustomerGuard] },
  { path: 'change_password', component: ChangePasswordComponent, canActivate: [CustomerGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [CustomerGuard] },
  { path: 'about-us', component: AboutUsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }