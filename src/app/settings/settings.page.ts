import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRadio, IonRadioGroup, IonButton, IonList, IonItem, IonInput, IonItemDivider, IonLabel } from '@ionic/angular/standalone';
import { StorageService } from '../services/storage.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonLabel, IonItemDivider, IonInput, IonItem, IonList, IonButton, IonRadioGroup, IonRadio, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink]
})
export class SettingsPage implements OnInit {
  unitSystem!: string;
  newsApi: string = "";
  weatherApi: string = "";

  constructor(private ss: StorageService) { }

  ngOnInit(): void {
      this.getConfig();
  }

  async getConfig() {
    this.unitSystem = await this.ss.get("unitSystem");
    if (this.newsApi.length > 0) this.newsApi = await this.ss.get("newsApi");
    if (this.weatherApi.length > 0) this.weatherApi = await this.ss.get("weatherApi");
  }

  async storeConfig() {
    await this.ss.set("unitSystem", this.unitSystem);
    if (this.newsApi.length > 0) await this.ss.set("newsApi", this.newsApi);
    if (this.weatherApi.length > 0) await this.ss.set("weatherApi", this.weatherApi);
  }
}