import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {TabViewChangeEvent} from "primeng/tabview";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-cash-flow-list',
  templateUrl: './cash-flow-list.component.html',
  styleUrls: ['./cash-flow-list.component.css']
})
export class CashFlowListComponent implements OnInit {

  tabIndex: number = 0;
  constructor(
    private route: ActivatedRoute,
    public location: Location
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['tab'] === 'cash-flow') {
        this.tabIndex = 0;
      } else if (params['tab'] === 'cash-flow-category') {
        this.tabIndex = 1;
      }
    });
  }

  onTabChanged(tabEvent: TabViewChangeEvent): void {
    let tabParam = '';
    switch (tabEvent.index) {
      case 0:
        tabParam = 'cash-flow';
        break;
      case 1:
        tabParam = 'cash-flow-category';
        break;
    }
    if (tabParam !== '') {
      const url = new URL(location.href);
      const params = new URLSearchParams(url.search);
      params.set('tab', tabParam);
      url.search = params.toString();
      this.location.replaceState(url.pathname + url.search);
    }
  }
}
