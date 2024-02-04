import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  applicationVersion: string = '1.1.0';
  lastUpdate: string = '04/02/2024';
}
