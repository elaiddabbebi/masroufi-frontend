import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  applicationOwner: string = 'Elaid Dabbebi';
  beginningYear: string = '2023';
  thisYear: string;

  constructor() {
    const now = new Date();
    this.thisYear = now.getFullYear().toString();
  }
}
