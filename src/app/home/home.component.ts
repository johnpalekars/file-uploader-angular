import { Component, OnInit } from '@angular/core'
import { AuthenticationService } from '../_services/authentication.service'
import { Router, ActivatedRoute } from '@angular/router'
import { first } from 'rxjs/operators'
import { AlertService } from '../_services/alert.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isAdmin: boolean
  returnUrl: string

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
  ) {}

  ngOnInit() {
    this.isAdmin = this.authenticationService.isAdminUser()
  }

  isAdminLogin() {
    console.log('this.isAdmin' + this.isAdmin)
    if (this.isAdmin) {
      return true
    } else {
      return false
    }
  }
  onSubmit() {
    this.authenticationService
      .logout()
      .pipe(first())
      .subscribe(
        () => {
          // this.router.navigate(['/login'])
        },
        error => {
          this.alertService.error(error)
        },
      )
  }
}
