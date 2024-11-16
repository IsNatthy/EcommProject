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

@NgModule({
  declarations: [CustomerComponent, DashboardComponent, CartItemsComponent, OrderPlaceComponent, MyPlaceOrdersComponent],
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