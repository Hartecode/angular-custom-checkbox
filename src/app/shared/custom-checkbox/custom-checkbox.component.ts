import { Component, EventEmitter, forwardRef, Input, Output, HostBinding } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-checkbox',
  templateUrl: './custom-checkbox.component.html',
  styleUrls: ['./custom-checkbox.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomCheckboxComponent),
      multi: true
    }
  ]
})
export class CustomCheckboxComponent implements ControlValueAccessor {

  @Input() value: CheckboxValue = false;
  @Input() label: string;
  @Input() checkboxId: string;
  @Input()
  @HostBinding('attr.disabled') disabled = false;

  @Output() clicked = new EventEmitter<boolean>();

  onTouched = () => {};
  onChange = (val: CheckboxValue) => {};

  changeCheckbox() {
    this.onTouched();
    if (!this.disabled) {
      this.value = (this.value === 'mixed') ? true : !this.value;
      this.onChange(this.value);
      this.clicked.emit(this.value);
    }
  }

  writeValue(val: CheckboxValue): void {
    this.value = val;
    this.onChange(this.value);
  }

  registerOnChange(fn: (val: CheckboxValue) => void ): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}

export type CheckboxValue = boolean | 'mixed';
