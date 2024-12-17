import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardContent, IonCardTitle, IonCard, IonCardHeader, IonCardSubtitle } from '@ionic/angular/standalone';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.page.html',
  styleUrls: ['./countries.page.scss'],
  standalone: true,
  imports: [IonCardSubtitle, IonCardHeader, IonCard, IonCardTitle, IonCardContent, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CountriesPage implements OnInit {
  searchParam: string = "";

  constructor(private ss: StorageService) { }

  ngOnInit() {
    this.getSearchParam();
  }

  async getSearchParam() {
    this.searchParam = await this.ss.get("country");
  }

}
