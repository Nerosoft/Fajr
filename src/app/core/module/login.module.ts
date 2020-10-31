import { SuccessGuard } from './../guard/success.guard';
import { AppComponent } from './../../app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/views/login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { UserMangerComponent } from 'src/app/views/user-manger/user-manger.component';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppBootstrapModule } from 'src/app/app-bootstrab.module';

import { SharedModule } from './shared/shared.module';
import { NavBarComponent } from 'src/app/views/nav-bar/nav-bar.component';
import { UserPassComponent } from 'src/app/views/user-pass/user-pass.component';

const appRoute: Routes = [
  { path: 'Login', component: LoginComponent },
  { path: 'Login/:productId', component: LoginComponent },

  {
    path: '',
    loadChildren: () => import('../../app.module').then((m) => m.AppModule),
    canLoad: [SuccessGuard],
  },
  { path: '**', redirectTo: 'Login' },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavBarComponent,
    UserMangerComponent,
    UserPassComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    AppBootstrapModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    RouterModule.forRoot(appRoute),

  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [UserPassComponent, UserMangerComponent],
})
export class LoginModule {}
