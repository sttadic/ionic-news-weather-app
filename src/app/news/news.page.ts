import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { HttpOptions } from '@capacitor/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class NewsPage  {
  newsData: any;
  countryData: any;
  countryName!: string;
  countryCode!: string;
  apiKey = "pub_628836546e756bbccd0a705c35d8b65b011d2";
  options: HttpOptions = {
    url: "https://newsdata.io/api/1/latest?apikey="
  }

  // Accessing data passed with Router: https://ionicacademy.com/pass-data-angular-router-ionic-4/
  constructor(private route: ActivatedRoute, private router: Router) {
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

  fetchNews() {
    this.options.url = this.options.url + this.apiKey + "&country=" + this.countryCode;
    console.log(this.options.url)
  }
}
