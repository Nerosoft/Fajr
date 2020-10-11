import { NgModule } from '@angular/core';
import { HomeComponent } from './views/home/home.component';

import { CategorysComponent } from './views/categorys/categorys.component';
import { ClientsComponent } from './views/clients/clients.component';
import {
  Routes,
  RouterModule,
} from '@angular/router';
import { InputComponent } from './views/input/input.component';
import { OutputComponent } from './views/output/output.component';
import { StoresComponent } from './views/stores/stores.component';
import { SuppliersComponent } from './views/suppliers/suppliers.component';

import { NgbdModalConfirmAutofocusComponent } from './views/ngbd-modal-confirm-autofocus/ngbd-modal-confirm-autofocus.component';
import { NgbdTableCompleteComponent } from './views/ngbd-table-complete/ngbd-table-complete.component';
import { TableEditComponent } from './views/ngbd-table-complete/edit/table-edit/table-edit.component';

import { BranchComponent } from './views/branch/branch.component';
import { AlertInfoComponent } from './views/alert-info/alert-info.component';
import { FormsModule } from '@angular/forms';
import { AppBootstrapModule } from './app-bootstrab.module';
import { SharedModule } from './core/module/shared/shared.module';
import { CommonModule } from '@angular/common';



const appRoute: Routes = [
  { path: '', component: HomeComponent},
  { path: 'branch', component: BranchComponent },
  {
    path: 'categorys',
    component: CategorysComponent,
  },
  { path: 'clients', component: ClientsComponent },
  { path: 'input', component: InputComponent },
  { path: 'output', component: OutputComponent },
  { path: 'stores', component: StoresComponent },
  {
    path: 'suppliers',
    component: SuppliersComponent,
  },
];

@NgModule({
  declarations: [
    HomeComponent,
    CategorysComponent,
    ClientsComponent,
    InputComponent,
    OutputComponent,
    StoresComponent,
    SuppliersComponent,
    NgbdModalConfirmAutofocusComponent,
    NgbdTableCompleteComponent,
    TableEditComponent,
    BranchComponent,

    AlertInfoComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppBootstrapModule,
    FormsModule,
    RouterModule.forChild(appRoute),
  ],
  exports: [],
  providers: [],
  bootstrap: [],
  entryComponents: [
    NgbdModalConfirmAutofocusComponent,
    TableEditComponent,
    AlertInfoComponent,
  ],
})
export class AppModule {}

