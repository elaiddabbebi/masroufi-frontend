import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  applicationVersion: string = '3.0.0';
  lastUpdate: string = '13-06-2024';
}
