import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonInput, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { settingsOutline } from 'ionicons/icons';
import { StorageService } from '../services/storage.service';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { __setFunctionName } from 'tslib';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonButton, IonInput, IonIcon, IonHeader, IonToolbar, IonTitle, IonContent, FormsModule, RouterLink],
})
export class HomePage {
  countrySearchParam!: string;
  unitSystem!: string;

  constructor(private ss: StorageService, private router: Router) {
    addIcons({settingsOutline});
  }

  ionViewWillEnter() {
    this.storeUnit();
  }

  // Default measurement system to 'metric' if none is selected on page load
  async storeUnit() {
    this.unitSystem = await this.ss.get("unitSystem");
    if (!this.unitSystem) await this.ss.set("unitSystem", "metric");
  }

  // Store country query in ionic storage and navigate to contries page
  async loadCountries() {
    if (!this.countrySearchParam) {
      alert("Search field cannot be empty!");
      return;
    } 
    await this.ss.set("countrySearchParam", this.countrySearchParam);
    this.router.navigate(['/countries']);
  }
}
