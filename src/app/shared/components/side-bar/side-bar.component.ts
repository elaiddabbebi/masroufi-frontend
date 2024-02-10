import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { MenuItem } from 'primeng/api';
import {TranslatePipe} from "../../pipes/translate.pipe";
import {AppSecurityContext} from "../../../main-module/app-security/app-security-context";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  constructor(
    public appSecurityContext: AppSecurityContext,
  ) {}

  ngOnInit(): void {}
}
