import { Component, EventEmitter, Input, Output, HostBinding } from '@angular/core';

@Component({
  selector: 'app-custom-checkbox',
  templateUrl: './custom-checkbox.component.html',
  styleUrls: ['./custom-checkbox.component.css']
})
export class CustomCheckboxComponent {

  @Input() value: boolean | 'mixed' = false;
  @Input() label: string;
  @Input() checkboxId: string;
  @Input()
  @HostBinding('attr.disabled') disabled = false;

  @Output() clicked = new EventEmitter<boolean>();

  changeCheckbox() {
    if (!this.disabled) {
      this.value = (this.value === 'mixed') ? true : !this.value;
      this.clicked.emit(this.value);
    }
  }

}
