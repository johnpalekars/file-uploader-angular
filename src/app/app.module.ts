import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { AppComponent } from './app.component'
import { FileUploadComponent } from './file-upload/file-upload.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ShowFilesComponent } from './show-files/show-files.component'
import { RouterModule, Routes } from '@angular/router'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { HomeComponent } from './home/home.component'
import { UserService } from './_services/user.service'
import { AuthenticationService } from './_services/authentication.service'
import { AlertService } from './_services/alert.service'
import { FileUploadServiceService } from './_services/file-upload-service.service'
import { AuthGuard } from './_guards'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { JwtInterceptor, ErrorInterceptor } from './_helpers'
import { routing } from './app.routing'
import { HomeRoutingModule } from './home-routing.module'
import { AlertComponent } from './_directives'
import { UserComponent } from './user/User.Component'
import { AdminComponent } from './admin/admin.component'
import { InterestComponent } from './interest/interest.component'
import { MatDialogModule } from '@angular/material/dialog'

@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    ShowFilesComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AlertComponent,
    UserComponent,
    AdminComponent,
    InterestComponent,
  ],
  imports: [
    HomeRoutingModule,
    routing,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    FileUploadServiceService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
