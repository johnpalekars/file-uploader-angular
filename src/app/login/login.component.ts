import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { first } from 'rxjs/operators'

import { AuthenticationService } from '../_services/authentication.service'
import { AlertService } from '../_services/alert.service'

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
  // Declearing required variables
  loginForm: FormGroup
  loading = false
  submitted = false
  returnUrl: string = '/home/upload'

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/home/upload'])
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      password: ['', Validators.required],
      username: ['', Validators.required],
    })
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls
  }

  // Calling login service for logging in the user
  onSubmit() {
    this.submitted = true

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return
    }

    this.loading = true
    this.authenticationService
      .login(this.loginForm.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data.auth_token) {
            this.router.navigate([this.returnUrl])
          }
        },
        err => {
          this.alertService.error(err)
          this.loading = false
        },
      )
  }
}
