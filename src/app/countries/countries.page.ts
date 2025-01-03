import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardContent, IonCardTitle, IonCard, IonCardHeader, IonCardSubtitle, IonButton } from '@ionic/angular/standalone';
import { StorageService } from '../services/storage.service';
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';
import { NavigationExtras, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.page.html',
  styleUrls: ['./countries.page.scss'],
  standalone: true,
  imports: [IonButton, IonCardHeader, IonCard, IonCardTitle, IonCardContent, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink]
})
export class CountriesPage {
  searchParam: string = "";
  countriesData: any;
  statusMessage: string = "Loading...";
  options!: HttpOptions;

  constructor(private ss: StorageService, private mhs: MyHttpService, private router: Router) { }

  // Set options url on page load to prevent odd behaviour where searchParam would be concatenated if 
  // page is refreshed, navigated back and another was search made 
  ionViewWillEnter() {
    this.options = {
      url: "https://restcountries.com/v3.1/name/"
    }
    this.getSearchParam();
  }

  // Handle odd error where data would persists if page was refreshed, navigated back and invalid 
  // search made (e.g. asdfsdfsa) -> set of countries from the last search would be displayed
  ionViewWillLeave() {
    this.countriesData = null;
  }

  // Fetch data from storage and call getCountries after searchParam is set
  async getSearchParam() {
    this.searchParam = await this.ss.get("countrySearchParam");
    if (this.searchParam.length > 0) this.getCountries();
  }

  async getCountries() {
    this.options.url += this.searchParam;
    const result = await this.mhs.get(this.options);
    // Handle client/server issues or no data fetched
    if (result.status >= 400 || result.data.length == 0) {
      this.statusMessage = "We looked everywhere but couldn’t find what you’re looking for. Please try again!";
      return; 
    } 
    this.countriesData = result.data;
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
