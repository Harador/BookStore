import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { TransformKeysInterceptor } from './interceptors/transform-keys.interceptor';

@NgModule({
  declarations: [],
  imports: [CommonModule, BrowserModule, BrowserAnimationsModule, HttpClientModule],
  exports: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TransformKeysInterceptor,
      multi: true,
    },
  ],
})

export class CoreModule {}
