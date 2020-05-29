import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroService } from './hero/hero.service';
import { AppBootstrapModule } from './app-bootstrab.module';
import { AboutMeComponent } from './PortoComponent/about-me/about-me.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { HttpClientModule ,HttpHeaders , HttpClient}    from '@angular/common/http';
import { NavBarComponent } from './views/nav-bar/nav-bar.component';
import { HomeComponent } from './views/home/home.component';
import { FooterComponent } from './views/footer/footer.component';
import { CategorysComponent } from './views/categorys/categorys.component';
import { ClientsComponent } from './views/clients/clients.component';
import { Routes, RouterModule } from '@angular/router';
import { InputComponent } from './views/input/input.component';
import { OutputComponent } from './views/output/output.component';
import { StoresComponent } from './views/stores/stores.component';
import { SuppliersComponent } from './views/suppliers/suppliers.component';
import { FormsModule }   from '@angular/forms';
import { ToastsComponent } from './views/toasts/toasts.component';
import { NgbdModalConfirmAutofocusComponent } from './views/ngbd-modal-confirm-autofocus/ngbd-modal-confirm-autofocus.component';
import { NgbdTableCompleteComponent } from './views/ngbd-table-complete/ngbd-table-complete.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { TestComponent } from './PortoComponent/test/test.component';
import { TableEditComponent } from './views/ngbd-table-complete/edit/table-edit/table-edit.component';
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { NgbdSortableHeader } from './views/ngbd-table-complete/sortable.directive';
import { LoginComponent } from './views/login/login.component';
const appRoute:Routes =[
  {path: '', component: HomeComponent },
  {path: 'categorys', component: CategorysComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'input', component: InputComponent },
  { path: 'output', component: OutputComponent },
  { path: 'stores', component: StoresComponent },
  { path: 'suppliers', component: SuppliersComponent },
  { path: 'Login', component: LoginComponent }

]

@NgModule({
  declarations: [
    AppComponent,
    AboutMeComponent,
    NavBarComponent,
    HomeComponent,
    FooterComponent,
    CategorysComponent,
    ClientsComponent,
    InputComponent,
    OutputComponent,
    StoresComponent,
    SuppliersComponent,
    ToastsComponent,
    NgbdModalConfirmAutofocusComponent,
    NgbdTableCompleteComponent,
    TestComponent,
    TableEditComponent,
    NgbdSortableHeader,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppBootstrapModule,
    NgImageSliderModule,
    HttpClientModule,
    FormsModule,
    ScrollingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    RouterModule.forRoot(appRoute),

  ],
  exports: [RouterModule],
  providers: [HeroService,],
  bootstrap: [AppComponent],
  entryComponents: [NgbdModalConfirmAutofocusComponent,TableEditComponent]
})
export class AppModule { 

}
