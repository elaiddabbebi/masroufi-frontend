import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-cancel-btn',
  templateUrl: './cancel-btn.component.html',
  styleUrls: ['./cancel-btn.component.css']
})
export class CancelBtnComponent {
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;
  @Output() click: EventEmitter<Event> = new EventEmitter<Event>();

  onButtonClick(event: Event): void {
    this.click.emit(event);
  }
}
