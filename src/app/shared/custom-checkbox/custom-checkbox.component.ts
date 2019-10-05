import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-checkbox',
  templateUrl: './custom-checkbox.component.html',
  styleUrls: ['./custom-checkbox.component.css']
})
export class CustomCheckboxComponent {

  @Input() value: boolean | 'mixed';
  @Input() label: string;
  @Input() checkboxId: string;
  @Output() clicked = new EventEmitter<boolean>();

  changeCheckbox() {
    this.value = (this.value === 'mixed') ? true : !this.value;
    this.clicked.emit(this.value);
  }

}
