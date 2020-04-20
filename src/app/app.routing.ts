import { Routes, RouterModule } from '@angular/router'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { InterestComponent } from './interest/interest.component'

const appRoutes: Routes = [
  // All the routes which are accessible to all the users is defined here

  { path: 'login', component: LoginComponent },
  { path: 'interest', component: InterestComponent },
  { path: 'register', component: RegisterComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '/login' },
]

export const routing = RouterModule.forRoot(appRoutes, {
  onSameUrlNavigation: 'reload',
})
