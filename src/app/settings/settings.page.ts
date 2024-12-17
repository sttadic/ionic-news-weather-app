import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRadio, IonRadioGroup, IonButton } from '@ionic/angular/standalone';
import { StorageService } from '../services/storage.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonButton, IonRadioGroup, IonRadio, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink]
})
export class SettingsPage implements OnInit {
  unit!: string;

  constructor(private ss: StorageService) { }

  ngOnInit(): void {
      this.getUnit();
  }

  async getUnit() {
    this.unit = await this.ss.get("unit");
    // If no unit stored, set default value "metric"
    if (!this.unit) this.unit = "metric";
  }

  async storeUnit() {
    await this.ss.set("unit", this.unit);
  }
}