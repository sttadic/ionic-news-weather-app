import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard } from '@ionic/angular/standalone';
import { HttpOptions } from '@capacitor/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyHttpService } from '../services/my-http.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
  standalone: true,
  imports: [IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class WeatherPage implements OnInit {
  weatherData: any = {};
  countryData: any;
  latitude!: string;
  longitude!: string;
  capital!: string;
  unit!: string;
  tempUnit!: string;
  hidden!: boolean;
  apiKey = "b2d49c5ea156ef787f5cde7cdd1d40cc";
  options: HttpOptions = {
    url: "https://api.openweathermap.org/data/2.5/weather"
  }

  // Accessing data passed with Angular Router: https://ionicacademy.com/pass-data-angular-router-ionic-4/
  constructor(private route: ActivatedRoute, private router: Router, private mhs: MyHttpService, private ss: StorageService) {
    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation()) {
        this.countryData = this.router.getCurrentNavigation()?.extras.state;
      }
    });
  }

  ngOnInit() {
    this.hidden = false;
    this.latitude = this.countryData.latitude;
    this.longitude = this.countryData.longitude;
    this.capital = this.countryData.capital;
  }

  ionViewWillEnter() {
    this.initUnitWeather();
  }

  // Get unit from storage or set default if unit cannot be retrieved, set tempUnit and fetch weather data
  async initUnitWeather() {
    this.unit = await this.ss.get("unitSystem");
    if (!this.unit) this.unit = "metric";
    this.setTempUnit();
    this.fetchWeather();
  }

  setTempUnit() {
    switch(this.unit) {
      case "imperial":
        this.tempUnit = "°F";
        break;
      case "standard":
        this.tempUnit = "K";
        break;
      default:
        this.tempUnit = "°C";
        break;
    }
  }

  async fetchWeather() {
    this.options.url = `${this.options.url}?lat=${this.latitude}&lon=${this.longitude}&units=${this.unit}&appid=${this.apiKey}`;
    let result = await this.mhs.get(this.options);
    // Check for valid status codes
    if (result.status >= 400) {
      this.hidden = true;
      return;
    }
    this.weatherData = result.data;
  }

}
