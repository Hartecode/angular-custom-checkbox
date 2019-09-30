import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CustomCheckboxComponent } from './shared/custom-checkbox/custom-checkbox.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomCheckboxComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
