import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-custom-checkbox',
  templateUrl: './custom-checkbox.component.html',
  styleUrls: ['./custom-checkbox.component.css']
})
export class CustomCheckboxComponent implements OnInit {

  @Input() label: string;

  constructor() { }

  ngOnInit() {
  }

}
