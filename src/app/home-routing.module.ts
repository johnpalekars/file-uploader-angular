import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { FileUploadComponent } from './file-upload/file-upload.component'
import { ShowFilesComponent } from './show-files/show-files.component'
import { HomeComponent } from './home/home.component'
import { UserComponent } from './user/User.Component'
import { AdminComponent } from './admin/admin.component';


import { AuthGuard } from './_guards'

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'upload',
        component: FileUploadComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'list',
        component: ShowFilesComponent,
        canActivate: [AuthGuard],
      },
       {
        path: 'user',
        component: UserComponent,
        canActivate: [AuthGuard],
      },
       {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
    
export class HomeRoutingModule {}
