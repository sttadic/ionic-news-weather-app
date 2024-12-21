import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonCardTitle } from '@ionic/angular/standalone';
import { HttpOptions } from '@capacitor/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyHttpService } from '../services/my-http.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
  standalone: true,
  imports: [IonCardTitle, IonCardSubtitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class NewsPage implements OnInit  {
  newsData: any;
  countryData: any;
  countryName!: string;
  countryCode!: string;
  apiKey = "pub_628836546e756bbccd0a705c35d8b65b011d2";
  options: HttpOptions = {
    url: "https://newsdata.io/api/1/latest?apikey="
  }

  // Accessing data passed with Angular Router: https://ionicacademy.com/pass-data-angular-router-ionic-4/
  constructor(private route: ActivatedRoute, private router: Router, private mhs: MyHttpService) {
    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation()) {
        this.countryData = this.router.getCurrentNavigation()?.extras.state;
      }
    });
  }

  ngOnInit() {
    this.countryName = this.countryData.countryName;
    this.countryCode = this.countryData.countryCode;
  }

  ionViewWillEnter() {
    this.fetchNews();
  }

  async fetchNews() {
    this.options.url = this.options.url + this.apiKey + "&country=" + this.countryCode;
    let result = await this.mhs.get(this.options);
    // Handle status codes that indicate issue with client request or server
    if (result.status >= 400) return;
    this.newsData = result.data.results;
  }
}
