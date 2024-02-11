import {Component, OnInit} from '@angular/core';
import {ConfirmationService} from "primeng/api";

@Component({
  selector: 'app-cash-flow-config',
  templateUrl: './cash-flow-config.component.html',
  styleUrls: ['./cash-flow-config.component.css'],
  providers: [ConfirmationService]
})
export class CashFlowConfigComponent implements OnInit {

  constructor(
    private configurationService: ConfirmationService
  ) {
  }

  ngOnInit(): void {
  }

}
