import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton } from '@ionic/angular/standalone';
import { HttpOptions } from '@capacitor/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MyHttpService } from '../services/my-http.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
  standalone: true,
  imports: [IonButton, IonCardTitle, IonCardSubtitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink]
})
export class NewsPage {
  newsData: any;
  countryData: any;
  countryName!: string;
  countryCode!: string;
  statusMessage: string = "Loading...";
  apiKey = "pub_628836546e756bbccd0a705c35d8b65b011d2";
  options!: HttpOptions;

  // Accessing data passed with Angular Router: https://ionicacademy.com/pass-data-angular-router-ionic-4/
  constructor(private route: ActivatedRoute, private router: Router, private mhs: MyHttpService) {
    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation()) {
        this.countryData = this.router.getCurrentNavigation()?.extras.state;
      }
    });
  }

  ionViewWillEnter() {
    this.options = {
      url: "https://newsdata.io/api/1/latest?apikey="
    }
    this.countryName = this.countryData.countryName;
    this.countryCode = this.countryData.countryCode;
    this.fetchNews();
  }

  ionViewWillLeave() {
    this.newsData = null;
  }

  async fetchNews() {
    this.options.url = this.options.url + this.apiKey + "&country=" + this.countryCode;
    let result = await this.mhs.get(this.options);
    // Handle client/server issues and absence of news data
    if (result.status >= 400 || result.data.totalResults == 0) {
      this.statusMessage = "No news for " + this.countryName + " at the moment";
      return;
    }
    this.newsData = result.data.results;
  }
}
