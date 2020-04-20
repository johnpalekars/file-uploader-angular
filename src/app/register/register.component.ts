import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { first } from 'rxjs/operators'

import { AuthenticationService } from '../_services/authentication.service'
import { AlertService } from '../_services/alert.service'
import { UserService } from '../_services/user.service'
import { PasswordStrengthValidator } from './valid.pass'

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {

  //------------ Declearing required variables------------------
  registerForm: FormGroup
  loading = false
  submitted = false

  // ------------ Constructor ----------------
  constructor(
    // Creating instances
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService,
  ) {}

  ngOnInit() {
    // ---------- Creating Form using FormBuilder -----------
    this.registerForm = this.formBuilder.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        username: ['', [Validators.required]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            PasswordStrengthValidator,
          ],
        ],
        re_password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            PasswordStrengthValidator,
          ],
        ],
      },
      {
        validators: this.password.bind(this),
      },
    )
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls
  }

  // func for checking if both entered password are same
  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password')
    const { value: re_Password } = formGroup.get('re_password')
    return password === re_Password ? null : { passwordNotMatch: true }
  }

  // Submitting the form object to the rest api
  onSubmit() {
    this.submitted = true
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return this.alertService.error('Invalid input')
    }
    this.loading = true
    this.userService
      .register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data)
          if (data['success']) {
            this.alertService.success('Registration successful', true)
            this.router.navigate(['/login'])
          }
        },
        error => {
          this.alertService.error(error)
          this.loading = false
        },
      )
  }
}
