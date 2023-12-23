import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-save-btn',
  templateUrl: './save-btn.component.html',
  styleUrls: ['./save-btn.component.css']
})
export class SaveBtnComponent {

  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;
  @Output() click: EventEmitter<Event> = new EventEmitter<Event>();

  onButtonClick(event: Event): void {
    this.click.emit(event);
  }
}
