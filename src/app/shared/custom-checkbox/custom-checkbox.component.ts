import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-checkbox',
  templateUrl: './custom-checkbox.component.html',
  styleUrls: ['./custom-checkbox.component.css']
})
export class CustomCheckboxComponent {
  value: boolean = false;

  @Input() label: string;
  @Input() checkboxId: string = 'checkbox';
  @Output() clicked = new EventEmitter<boolean>();

  changeCheckbox() {
    this.value = !this.value;
    this.clicked.emit(this.value);
  }

}
