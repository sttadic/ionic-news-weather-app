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
  unitSystem!: string;

  constructor(private ss: StorageService) { }

  ngOnInit(): void {
      this.getUnit();
  }

  async getUnit() {
    this.unitSystem = await this.ss.get("unitSystem");
    // If no unitSystem stored, set default value to "metric"
    if (!this.unitSystem) { 
      this.unitSystem = "metric";
      this.storeUnit();
    }
  }

  async storeUnit() {
    await this.ss.set("unitSystem", this.unitSystem);
  }
}