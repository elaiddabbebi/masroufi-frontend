import {Component, OnInit} from '@angular/core';
import {AppSecurityContext} from "../app-security/app-security-context";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(
    public appSecurityContext: AppSecurityContext
  ) {}

  ngOnInit(): void {}
}
