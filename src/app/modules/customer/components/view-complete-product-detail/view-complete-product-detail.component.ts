import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../service/customer.service';
import { UserStorageService } from 'src/app/auth/auth-services/storage-service/user-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { ImgDialogComponent } from './img-dialog/img-dialog.component';

@Component({
  selector: 'app-view-complete-product-detail',
  templateUrl: './view-complete-product-detail.component.html',
  styleUrls: ['./view-complete-product-detail.component.scss']
})
export class ViewCompleteProductDetailComponent {
  productId: number = this.activatedRoute.snapshot.params["productId"];
  isSpinning: boolean = false;
  reviewForm!: FormGroup;
  product: any;
  FAQS: any[] = [];
  reviews: any[] = [];
  isInWishlist: boolean = false;

  constructor(
    private snackBar: MatSnackBar,
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getCompleteProductDetailById();
    this.checkIfInWishlist();
  }

  checkIfInWishlist(): void {
    this.customerService.isProductInWishlist(this.productId).subscribe(
      isInWishlist => {
        this.isInWishlist = isInWishlist;
      }
    );
  }

  getCompleteProductDetailById() {
    this.customerService.getCompleteProductDetailById(this.productId).subscribe(
      (res) => {
        console.log(res);
        this.product = res.productDto;
        if (res.productDto.returnedImg != null) {
          this.product.processedImg = 'data:image/png;base64,' + res.productDto.returnedImg;
        }
        this.FAQS = res.faqDtoList;
        // this.Reviews = res.reviewDtoList;
        res.reviewDtoList.forEach(element => {
          element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
          this.reviews.push(element);
        });
      }
    );
  }

  addToWishlist(): void {
    if (this.isInWishlist) {
      this.snackBar.open('Product is already in your wishlist', 'Close', {
        duration: 5000
      });
      return;
    }
    this.isSpinning = true;
    const wishlistDto = {
      productId: this.productId,
      userId: UserStorageService.getUserId(),
    }
    this.customerService.addProductToWishlist(wishlistDto).subscribe({
      next: (res) => {
        this.isSpinning = false;
        if (res.id != null) {
          this.isInWishlist = true;
          this.snackBar.open('Product Added to Wishlist Successfully!', 'Close', {
            duration: 5000
          });
        }
      },
      error: (error) => {
        this.isSpinning = false;
        this.snackBar.open("Error adding to wishlist", 'ERROR', {
          duration: 5000
        });
      }
    });
  }
  
  openImageDialog(imageUrl: string): void {
  this.dialog.open(ImgDialogComponent, {
    data: { imageUrl },
    maxWidth: '90vw',
    maxHeight: '90vh',
    panelClass: 'image-dialog'
  });
}
  
}
