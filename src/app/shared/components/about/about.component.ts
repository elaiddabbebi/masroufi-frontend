import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  applicationVersion: string = '2.2.5';
  lastUpdate: string = '09-03-2024';
}
