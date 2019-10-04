import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-custom-checkbox',
  templateUrl: './custom-checkbox.component.html',
  styleUrls: ['./custom-checkbox.component.css']
})
export class CustomCheckboxComponent {
  value: boolean = false;

  @Input() label: string;
  @Input() id: string = 'checkbox';


  changeCheckbox() {
    this.value = !this.value;
  }

}
