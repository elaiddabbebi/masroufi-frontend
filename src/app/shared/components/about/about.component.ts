import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  applicationVersion: string = '2.0.0';
  lastUpdate: string = '24/02/2024';
}
