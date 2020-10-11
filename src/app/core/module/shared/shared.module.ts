import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastsComponent } from 'src/app/views/toasts/toasts.component';

import { AppBootstrapModule } from 'src/app/app-bootstrab.module';


@NgModule({
  declarations: [ToastsComponent],
  imports: [
    CommonModule,
    AppBootstrapModule,
  ],
  exports: [
    ToastsComponent,
  ],
})
export class SharedModule {}
