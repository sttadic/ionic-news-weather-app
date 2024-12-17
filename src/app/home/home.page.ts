import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonInput, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { settingsOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonButton, IonInput, IonIcon, IonHeader, IonToolbar, IonTitle, IonContent, FormsModule],
})
export class HomePage {
  country!: string;

  constructor() {
    addIcons({settingsOutline});
  }
}
