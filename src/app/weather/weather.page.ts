import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonIcon } from '@ionic/angular/standalone';
import { HttpOptions } from '@capacitor/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MyHttpService } from '../services/my-http.service';
import { StorageService } from '../services/storage.service';
import { addIcons } from 'ionicons';
import { arrowBackCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
  standalone: true,
  imports: [IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink]
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
  backgroundImage!: string;
  apiKey = "b2d49c5ea156ef787f5cde7cdd1d40cc";
  options: HttpOptions = {
    url: "https://api.openweathermap.org/data/2.5/weather"
  }

  // Accessing data passed with Angular Router: https://ionicacademy.com/pass-data-angular-router-ionic-4/
  constructor(private route: ActivatedRoute, private router: Router, private mhs: MyHttpService, private ss: StorageService) {
    addIcons({arrowBackCircleOutline});
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
    this.setBackground(result.data.weather[0].id);
    this.weatherData = result.data;
  }

  // Set background image depending on weather condition code
  setBackground(weatherId: number) {
    // Set default if no weather id and bail out
    if (!weatherId) {
      this.backgroundImage = "/assets/images/default.jpg";
      return;
    }
    if (weatherId < 300) {
      this.backgroundImage = "/assets/images/thunderstorm.jpg";
    } else if (weatherId < 600) {
      this.backgroundImage = "/assets/images/rain.jpg";
    } else if (weatherId < 700) {
      this.backgroundImage = "/assets/images/snow.jpg";
    } else if (weatherId < 800) {
      this.backgroundImage = "/assets/images/foggy.jpg";
    } else if (weatherId < 801) {
      this.backgroundImage = "/assets/images/clear_sunny.jpg";
    } else if (weatherId < 803) {
      this.backgroundImage = "/assets/images/light_clouds.jpg";
    } else {
      this.backgroundImage = "/assets/images/thick_clouds.jpg";
    }
  }
}
