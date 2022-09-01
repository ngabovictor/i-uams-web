import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginLinkAuthComponent } from './pages/login-link-auth/login-link-auth.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SideNavComponent } from './pages/side-nav/side-nav.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'login-with-link/:login_id', component: LoginLinkAuthComponent },
  {
    path: 'dashboard',
    component: SideNavComponent,
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { path: 'profile', component: ProfileComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
