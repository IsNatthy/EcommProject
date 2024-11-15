import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.scss']
})
export class CartItemsComponent {
  cartItems: any[] = [];
  order: any;
  couponForm!: FormGroup;

  constructor(private customerService: CustomerService,
    private snackbar: MatSnackBar,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this.getCart();

    this.couponForm = this.fb.group({
      code: [null, [Validators.required]]
    });
  }

  getCart() {
    this.cartItems = [];
    this.customerService.getCartByUserId().subscribe((res) => {
      console.log(res);
      res.cartItems.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.cartItems.push(element);
      });
      this.cartItems = res.cartItems;
      this.order = res;
    });
  }

  applyCoupon(){
    this.customerService.applyToken(this.couponForm.get(['code'])!.value).subscribe(res =>{
      this.snackBar.open("Coupon Applied Successfully", 'Close', {
        duration: 5000
      });
      this.getCart();
    }, error => {
      console.log(error)
      this.snackBar.open(error.error, 'Close', {
        duration: 5000
      });
    });
  }

  increaseQuantity(productId: any) {
    console.log("increase", productId)
    this.customerService.addPlusOnProduct(productId).subscribe(() => {
      this.snackbar.open('Product quantity increased.', 'Close', { duration: 5000 });
      this.getCart();
    });
  }

  decreaseQuantity(productId: any) {
    console.log("decrease", productId)
    this.customerService.addMinusOnProduct(productId).subscribe(() => {
      this.snackbar.open('Product quantity decreased.', 'Close', { duration: 5000 });
      this.getCart();
    });
  }

}
