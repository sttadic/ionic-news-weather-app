import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardContent, IonCardTitle, IonCard, IonCardHeader, IonCardSubtitle, IonButton } from '@ionic/angular/standalone';
import { StorageService } from '../services/storage.service';
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.page.html',
  styleUrls: ['./countries.page.scss'],
  standalone: true,
  imports: [IonButton, IonCardHeader, IonCard, IonCardTitle, IonCardContent, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CountriesPage implements OnInit {
  searchParam: string = "";
  contriesData: any;
  options: HttpOptions = {
    url: "https://restcountries.com/v3.1/name/"  
  }

  constructor(private ss: StorageService, private mhs: MyHttpService, private router: Router) { }

  ngOnInit() {
    this.getSearchParam();
  }

  // Fetch data from storage and call getContries after searchParam is set
  async getSearchParam() {
    this.searchParam = await this.ss.get("countrySearchParam");
    this.getCountries();
  }

  async getCountries() {
    this.options.url = this.options.url + this.searchParam;
    const result = await this.mhs.get(this.options);
    // Don't proceed in case no countries can be found (404) or some other client/server issue
    if (result.data.status >= 400) return; 
    this.contriesData = result.data;
  }

  // Passing data using Router: https://ionicacademy.com/pass-data-angular-router-ionic-4/
  openNews(countryName: string, countryCode: string) {
    let navigationExtras: NavigationExtras = {
      state: {
        countryName: countryName,
        countryCode: countryCode
      }
    }
    this.router.navigate(["/news"], navigationExtras);
  }

  openWeather(latitude: string, longitude: string, capital: string) {
    let navigationExtras: NavigationExtras = {
      state: {
        latitude: latitude,
        longitude: longitude,
        capital: capital
      }
    }
    this.router.navigate(["/weather"], navigationExtras);
  }

}
