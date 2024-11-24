import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/auth-components/login/login.component';
import { SignupComponent } from './auth/auth-components/signup/signup.component';
import { TrackOrderComponent } from './auth/auth-components/track-order/track-order.component';
import { AboutUsComponent } from './auth/auth-components/about-us/about-us.component';
import { NoAuthGuard } from './auth/auth-guards/no-auth/no-auth.guard';

const routes: Routes = [
  { path: '', component: AboutUsComponent, canActivate: [NoAuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [NoAuthGuard] },
  { path: 'order', component: TrackOrderComponent, canActivate: [NoAuthGuard] },
  { path: 'about-us', component: AboutUsComponent, canActivate: [NoAuthGuard] },
  { path: 'customer', loadChildren: () => import('./modules/customer/customer.module').then(m => m.CustomerModule) }, 
  { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
