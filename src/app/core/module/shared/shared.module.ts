import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastsComponent } from 'src/app/views/toasts/toasts.component';

import { AppBootstrapModule } from 'src/app/app-bootstrab.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [ToastsComponent],
  imports: [
    CommonModule,
    AppBootstrapModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'ar',
      loader: {
        provide: TranslateLoader,
        useFactory: (httpLoader),
        deps: [HttpClient],
      },
      isolate: true,
    }),
  ],
  exports: [
    ToastsComponent,
    TranslateModule
  ],
})
export class SharedModule {}

export function httpLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../../../assets/i18en/', '.json');
}
