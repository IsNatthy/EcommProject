import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserStorageService } from './auth/auth-services/storage-service/user-storage.service';
import { TranslateService } from '@ngx-translate/core'; 
import { BehaviorSubject } from 'rxjs';  

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'EcommProject';

  isCustomerLoggedIn: boolean = UserStorageService.isCustomerLoggedIn();
  isAdminLoggedIn: boolean = UserStorageService.isAdminLoggedIn();
  
  private currentLanguageSubject = new BehaviorSubject<string>('en');
  currentLanguage = this.currentLanguageSubject.asObservable();

  private readonly LOCAL_STORAGE_LANGUAGE = 'language';

  constructor(private router: Router, private translateService: TranslateService) { 
    const savedLang = localStorage.getItem(this.LOCAL_STORAGE_LANGUAGE) || 'en';
    this.currentLanguageSubject = new BehaviorSubject<string>(savedLang);
    this.translateService.use(savedLang);
  }

  setLanguage(lang: string) {
    this.translateService.use(lang);
    this.currentLanguageSubject.next(lang);
    localStorage.setItem(this.LOCAL_STORAGE_LANGUAGE, lang); 
  }

  getCurrentLanguage() {
    return this.currentLanguageSubject.value;
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event.constructor.name === "NavigationEnd") {
        this.isCustomerLoggedIn = UserStorageService.isCustomerLoggedIn();
        this.isAdminLoggedIn = UserStorageService.isAdminLoggedIn();
      }
    })
  }

  logout() {
    UserStorageService.signOut();
    this.router.navigateByUrl('login');
  }
}