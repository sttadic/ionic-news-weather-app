import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardContent, IonCardTitle, IonCard, IonCardHeader, IonCardSubtitle, IonButton } from '@ionic/angular/standalone';
import { StorageService } from '../services/storage.service';
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.page.html',
  styleUrls: ['./countries.page.scss'],
  standalone: true,
  imports: [IonButton, IonCardSubtitle, IonCardHeader, IonCard, IonCardTitle, IonCardContent, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CountriesPage implements OnInit {
  searchParam: string = "";
  contriesData: any;
  options: HttpOptions = {
    url: "https://restcountries.com/v3.1/name/"  
  }

  constructor(private ss: StorageService, private mhs: MyHttpService) { }

  ngOnInit() {
    this.getSearchParam();
  }

  // Fetch data from storage and call getContries after searchParam is set
  async getSearchParam() {
    this.searchParam = await this.ss.get("country");
    this.getCountries();
  }

  async getCountries() {
    this.options.url = this.options.url + this.searchParam;
    const result = await this.mhs.get(this.options);
    this.contriesData = result.data;
    console.log(this.contriesData);
  }

}
