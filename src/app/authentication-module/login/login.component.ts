import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";
import {LoginRequestModel} from "./types/login-request-model";
import {catchError, tap} from "rxjs";
import {Router} from "@angular/router";
import {LoginResponseModel} from "./types/login-response-model";
import {Message} from "primeng/api";
import {TranslatePipe} from "../../shared/pipes/translate.pipe";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService, TranslatePipe]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading: boolean = false;
  error: boolean = false;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private service: AuthenticationService,
    private router: Router,
    private translate: TranslatePipe
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  public get controls() {
    return this.loginForm?.controls;
  }

  login() {
    this.loading = true;
    const credentials: LoginRequestModel = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    this.service.login(credentials).pipe(
        tap({
          next: (response: LoginResponseModel) => {
            this.error = false;
            localStorage.setItem('access_token', response.access_token);
            localStorage.setItem('refresh_token', response.refresh_token);
            localStorage.setItem('uuid', response.uuid);
            this.router.navigate(['/main/dashboard']);
          },
          error: (error) => {
            this.loading = false;
            this.error = true;
            this.errorMessage = this.translate.transform('INVALID_CREDENTIALS');
          }
        })
    ).subscribe();
  }

}
