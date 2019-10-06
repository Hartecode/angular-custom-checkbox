import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentValue: boolean;
  title = 'custom-checkbox';

  sampleForm = new FormGroup({
    checkBox: new FormControl('mixed')
  });
}
