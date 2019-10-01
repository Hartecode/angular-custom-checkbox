import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomCheckboxComponent } from './custom-checkbox/custom-checkbox.component';

@NgModule({
  declarations: [CustomCheckboxComponent],
  imports: [
    CommonModule
  ],
  exports: [CustomCheckboxComponent]
})
export class SharedModule { }
