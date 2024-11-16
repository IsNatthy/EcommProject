import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CartItemsComponent } from './components/cart-items/cart-items.component';
import { OrderPlaceComponent } from './components/order-place/order-place.component';
import { MyPlaceOrdersComponent } from './components/my-place-orders/my-place-orders.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'cart', component: CartItemsComponent },
  { path: 'my_orders', component: MyPlaceOrdersComponent, },
  { path: 'place-order', component: OrderPlaceComponent,  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }