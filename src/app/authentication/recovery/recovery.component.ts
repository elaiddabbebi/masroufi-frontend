import { Component } from '@angular/core';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent {
  loading: boolean = false;
  searchField: string = 'EMAIL';
  username: string = '';

  constructor() {}

  ngOnInit(): void {

  }

  search() {
    this.loading = true;

    setTimeout(() => {
      this.loading = false
    }, 2000);
  }

  choose(choice: string): void {
    this.searchField = choice;
  }
}
