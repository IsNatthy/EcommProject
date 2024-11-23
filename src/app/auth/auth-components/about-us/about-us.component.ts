import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/modules/customer/service/customer.service';
import { UserStorageService } from '../../auth-services/storage-service/user-storage.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  isCustomerLoggedIn = false;

  products = [
    {
      image: 'assets/img/celosia.jpg',
      title: 'Decorative Lattices',
      description: 'Custom-designed lattices for elegant space division'
    },
    {
      image: 'assets/img/maceta.jpg',
      title: 'Modern Planters',
      description: 'Stylish planters for indoor and outdoor spaces'
    },
    {
      image: 'assets/img/jarron.jpg',
      title: 'Artisanal Flowerpots',
      description: 'Unique handcrafted pots for your botanical collection'
    },
    {
      image: 'assets/img/tabla.jpg',
      title: 'Wooden Boards',
      description: 'Premium crafted wooden boards for serving and decoration'
    }
  ];

  constructor(private userStorageService: UserStorageService  ) {}

  ngOnInit() {
    this.isCustomerLoggedIn = UserStorageService.isCustomerLoggedIn();
  }
}