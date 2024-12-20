import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { HttpOptions } from '@capacitor/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class NewsPage  {
  newsData: any;
  countryCode!: string;
  apiKey = "pub_628836546e756bbccd0a705c35d8b65b011d2";
  options: HttpOptions = {
    url: "https://newsdata.io/api/1/latest?apikey=" + this.apiKey + "&country=" + this.countryCode
  }

  constructor() { }

  

}
