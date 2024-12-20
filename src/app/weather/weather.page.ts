import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { HttpOptions } from '@capacitor/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyHttpService } from '../services/my-http.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class WeatherPage implements OnInit {
  weatherData: any;
  longLatData: any;
  latitude!: string;
  longitude!: string;
  unit!: string;
  apiKey = "b2d49c5ea156ef787f5cde7cdd1d40cc";
  options: HttpOptions = {
    url: "https://api.openweathermap.org/data/2.5/weather"
  }

  // Accessing data passed with Angular Router: https://ionicacademy.com/pass-data-angular-router-ionic-4/
  constructor(private route: ActivatedRoute, private router: Router, private mhs: MyHttpService, private ss: StorageService) {
    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation()) {
        this.longLatData = this.router.getCurrentNavigation()?.extras.state;
      }
    });
  }

  ngOnInit() {
    this.latitude = this.longLatData.latitude;
    this.longitude = this.longLatData.longitude;
  }

  ionViewWillEnter() {
    this.initUnitWeather();
  }

  // Get unit from storage and fetch weather
  async initUnitWeather() {
    this.unit = await this.ss.get("unitSystem");
    if (!this.unit) this.unit = "metric";
    this.fetchWeather();
  }

  async fetchWeather() {
    console.log(this.unit)
  }

}
