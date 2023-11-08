import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserManagementComponent } from './user-management/user-management.component';
import { RecycleBinComponent } from './recycle-bin/recycle-bin.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthGuard } from './guard/auth.guard';
import { UserprofilepageComponent } from './userprofilepage/userprofilepage.component';

const routes: Routes = [
  { path: '', component: SignInComponent },
  {
    path: 'user',
    component: UserManagementComponent,
    canActivate: [AuthGuard],
  },
  { path: 'recycle', component: RecycleBinComponent, canActivate: [AuthGuard] },
  { path: 'signin', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
  {
    path: 'userprofile',
    component: UserprofilepageComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
