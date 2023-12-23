import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-confirm-cancel-footer',
  templateUrl: './confirm-cancel-footer.component.html',
  styleUrls: ['./confirm-cancel-footer.component.css']
})
export class ConfirmCancelFooterComponent {

  @Input() confirmIsLoading: boolean = false;
  @Input() cancelIsLoading: boolean = false;
  @Input() confirmIsDisabled: boolean = false;
  @Input() cancelIsDisabled: boolean = false;

  @Output() onConfirm: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() onCancel: EventEmitter<Event> = new EventEmitter<Event>();

  confirm(event: Event): void {
    this.onConfirm.emit(event);
  }

  cancel(event: Event): void {
    this.onCancel.emit(event);
  }
}
