import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideNavComponent } from './pages/side-nav/side-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { LoginComponent } from './pages/login/login.component';
import { MaterialsModule } from './materials/materials.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginLinkAuthComponent } from './pages/login-link-auth/login-link-auth.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SelectionTypeDialogComponent } from './dialogs/selection-type-dialog/selection-type-dialog.component';
import { TextTypeDialogComponent } from './dialogs/text-type-dialog/text-type-dialog.component';
import { FilesTypeDialogComponent } from './dialogs/files-type-dialog/files-type-dialog.component';
import { EmailVerificationDialogComponent } from './dialogs/email-verification-dialog/email-verification-dialog.component';
import { PasswordChangeDialogComponent } from './dialogs/password-change-dialog/password-change-dialog.component';
import { RegisterComponent } from './pages/register/register.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    LoginComponent,
    LoginLinkAuthComponent,
    ProfileComponent,
    SelectionTypeDialogComponent,
    TextTypeDialogComponent,
    FilesTypeDialogComponent,
    EmailVerificationDialogComponent,
    PasswordChangeDialogComponent,
    RegisterComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
