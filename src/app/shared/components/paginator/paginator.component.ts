import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ResultSetResponse} from "../../types/result-set-response";
import {PageChangeEvent} from "../../types/page-change-event";

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent {

  @Input() resultSet: ResultSetResponse<any> = {
    result: [],
    total: 0,
    page: 1,
    size: 0,
  };
  @Output() onPageChange: EventEmitter<PageChangeEvent> = new EventEmitter<PageChangeEvent>();

  first: number = 0;
  rows: number = 10;

  onChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    const pageChangeEvent: PageChangeEvent = {
      page: event.page + 1,
      size: event.rows
    };

    this.onPageChange.emit(pageChangeEvent);
  }
}
