import {Component, OnInit, OnDestroy} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {debounce , distinctUntilChanged, tap} from 'rxjs/operators';
import {Subscription, Observable, interval} from 'rxjs';
import {CheckboxValue} from './shared/custom-checkbox/custom-checkbox.component';
import {sizes, languages, Facets} from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private subscription: Subscription[] = [];
  public indeterminateFrom: FormGroup;
  public title = 'custom-checkbox';
  private controlsConfig = {
    size: [false],
    sizeSubGroup: this.fb.group({
      small: [false],
      medium: [false],
      large: [false],
      xLarge: [false]
    }),
    language: ['mixed'],
    languageSubGroup: this.fb.group({
      english: [true],
      englishUS: [false],
      englishUK: [false],
      spanish: [false],
      german: [false]
    })
  };

  constructor(private fb: FormBuilder) { }

  public sampleForm: FormGroup = this.fb.group({checkBox: ['mixed']});

  ngOnInit() {
    this.indeterminateFrom = this.fb.group(this.controlsConfig);
    this.onChange();
  }

  ngOnDestroy() {
    this.subscription.forEach(s => s.unsubscribe());
  }

  changeObservable = (name: string): Observable<any> => this.indeterminateFrom.get(name).valueChanges;

  updateSubGroup(val: CheckboxValue, groupName: string, list: Facets[]) {
    if (val !== 'mixed') {
      // get ref of the nested form
      const subGroup: AbstractControl = this.indeterminateFrom.get(groupName);
      // looping through the list to set the values in the nested form to be the same
      list.forEach(obj => subGroup.get(obj.form).setValue(val));
    }
  }

  applyingSubGroupPiping(category: string, groupName: string, list: Facets[]) {
    return this.changeObservable(category).pipe(
      distinctUntilChanged(), // only get the value if it changed
      tap(val => { this.updateSubGroup(val, groupName, list); })
      ).subscribe();
  }

  updateCategoryCheckbox(category: string, group: string): Subscription {
    return this.changeObservable(group)
    // This observable can emit mulit times in a short period of time
    // the emotions are debounce so we can get only the least emitted value
      .pipe(debounce(() => interval()))
      .subscribe(obj => {
        const keys = Object.keys(obj);
        // Looping through all the keys to see if they have the same value.
        // If true then return the like value else return 'mixed'.
        const value: CheckboxValue = keys.reduce((acc: boolean | 'string', cur) => {
          return (acc === obj[cur]) ? obj[cur] : 'mixed';
        }, obj[keys[0]]);
        // Set the value of the category checkbox
        this.indeterminateFrom.get(category).setValue(value);
      });
  }

  onChange() {
    this.subscription = [
      this.applyingSubGroupPiping('size', 'sizeSubGroup', sizes),
      this.applyingSubGroupPiping('language', 'languageSubGroup', languages),
      this.updateCategoryCheckbox('size', 'sizeSubGroup'),
      this.updateCategoryCheckbox('language', 'languageSubGroup')
    ];
  }


}
