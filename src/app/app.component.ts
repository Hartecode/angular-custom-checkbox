import {Component, OnInit, OnDestroy} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {debounce , distinctUntilChanged, tap} from 'rxjs/operators';
import {Subscription, Observable, interval} from 'rxjs';
import {CheckboxValue} from './shared/custom-checkbox/custom-checkbox.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  indeterminateFrom: FormGroup;
  currentValue: boolean;
  title = 'custom-checkbox';
  sizes: Facets[] = [
    {
      label: 'Small',
      form: 'small'
    },
    {
      label: 'Medium',
      form: 'medium'
    },
    {
      label: 'Large',
      form: 'large'
    },
    {
      label: 'X-Large',
      form: 'xLarge'
    }
  ];

  languages: Facets[] = [
    {
      label: 'English',
      form: 'english',
    },
    {
      label: 'English (US)',
      form: 'englishUS',
    },
    {
      label: 'English (UK)',
      form: 'englishUK',
    },
    {
      label: 'Spanish',
      form: 'spanish'
    },
    {
      label: 'German',
      form: 'german'
    }
  ];
  controlsConfig = {
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

  sampleForm = new FormGroup({
    checkBox: new FormControl('mixed')
  });

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
      const subGroup: AbstractControl = this.indeterminateFrom.get(groupName);
      list.forEach(obj => subGroup.get(obj.form).setValue(val));
    }
  }

  applyingSubGroupPiping(observable: Observable<CheckboxValue>, groupName: string, list: Facets[]) {
    return observable.pipe(distinctUntilChanged(), tap(val => {
      this.updateSubGroup(val, groupName, list);
    })).subscribe();
  }

  updateCategoryCheckbox(category: string, group: string): Subscription {
    return this.changeObservable(group)
      .pipe(debounce(() => interval()))
      .subscribe(obj => {
        const keys = Object.keys(obj);
        const value: CheckboxValue = keys.reduce((acc: boolean | 'string', cur) => {
          return (acc === obj[cur]) ? obj[cur] : 'mixed';
        }, obj[keys[0]]);
        this.indeterminateFrom.get(category).setValue(value);
      });
  }

  onChange() {
    this.subscription.push(this.applyingSubGroupPiping(
      this.changeObservable('size'), 'sizeSubGroup', this.sizes));
    this.subscription.push(this.applyingSubGroupPiping(
      this.changeObservable('language'), 'languageSubGroup', this.languages));
    this.subscription.push(this.updateCategoryCheckbox('size', 'sizeSubGroup'));
    this.subscription.push(this.updateCategoryCheckbox('language', 'languageSubGroup'));
  }


}

interface Facets {
  label: string;
  form: string;
}