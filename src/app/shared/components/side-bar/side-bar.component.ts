import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { MenuItem } from 'primeng/api';
import {TranslatePipe} from "../../pipes/translate.pipe";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
  providers: [TranslatePipe]
})
export class SideBarComponent implements OnInit, OnChanges {

  @Input()
  items: MenuItem[] | undefined = [];

  constructor(
    private translate: TranslatePipe
  ) {}

  ngOnInit(): void {

  }

  translateMenuItemsLabels(item: MenuItem): void {
    if (item) {
      item.label = this.translate.transform(item.label ? item.label : '');
      if (item.items) {
        item.items.forEach(elt => {
          this.translateMenuItemsLabels(elt);
        })
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.items?.forEach(item => {
      this.translateMenuItemsLabels(item);

    })
  }
}
