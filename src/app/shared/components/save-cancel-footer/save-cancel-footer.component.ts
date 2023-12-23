import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-save-cancel-footer',
  templateUrl: './save-cancel-footer.component.html',
  styleUrls: ['./save-cancel-footer.component.css']
})
export class SaveCancelFooterComponent {

  @Input() saveIsLoading: boolean = false;
  @Input() cancelIsLoading: boolean = false;
  @Input() saveIsDisabled: boolean = false;
  @Input() cancelIsDisabled: boolean = false;

  @Output() onSave: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() onCancel: EventEmitter<Event> = new EventEmitter<Event>();

  save(event: Event): void {
    this.onSave.emit(event);
  }

  cancel(event: Event): void {
    this.onCancel.emit(event);
  }
}
