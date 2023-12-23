import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-confirm-btn',
  templateUrl: './confirm-btn.component.html',
  styleUrls: ['./confirm-btn.component.css']
})
export class ConfirmBtnComponent {
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;
  @Output() click: EventEmitter<Event> = new EventEmitter<Event>();

  onButtonClick(event: Event): void {
    this.click.emit(event);
  }
}
