import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ReApiService } from '../re-api.service';

@Component({
  selector: 'app-advance-filter',
  templateUrl: './advance-filter.component.html',
  styleUrls: ['./advance-filter.component.scss']
})
export class AdvanceFilterComponent implements OnInit {
  form: FormGroup;
  characteristicsFormArray: FormArray;

  characteristics = [
    'pandor dors',
    'airConditioner',
    'warhouse',
    'balcony',
    'accessibility',
    'renovated',
    'bars',
    'elevator',
    'parking',
    'furniture',
    'kosher',
    'furnished',
    'exlusive',
  ];
  characteristicsChecked = [];
  constructor(private formBuilder: FormBuilder, private reApiService: ReApiService) { }

  onCheckCharacteristic(characteristic) {
    // this.characteristicsFormArray = this.form.get('characteristics') as FormArray;

    // this.characteristicsFormArray[index]={... this.characteristicsFormArray[index],value:true}
    if (this.characteristicsChecked.includes(characteristic)) {
      this.characteristicsChecked = this.characteristicsChecked.filter(ch => ch !== characteristic);
    } else {
      this.characteristicsChecked.push(characteristic);
    }
    this.form.controls.characteristics.setValue(this.characteristicsChecked)
  }
  onSubmit() {
    const formValue = { ...this.form.value };//, characteristics: this.characteristicsChecked }
    this.reApiService.getFilterRE(null, formValue);

  }
  onFormValueChange() {
    this.form.valueChanges.subscribe(value => {
      this.reApiService.advanceSearchDetails = value;
    })
  }
  // createFormCharacteristic(characteristic = '', value = false) {
  //   return this.formBuilder.group({ characteristic, value });
  // }
  // getCharacteristics() {
  //   const characteristics = this.form.get('characteristics').value
  //   return this.form.get('characteristics').value;
  // }
  ngOnInit() {
    this.form = this.formBuilder.group({
      maxFloor: '',
      minFloor: '',
      maxSize: '',
      minSize: '',
      enteryDate: null,
      freeSearch: '',
      characteristics: null // this.formBuilder.array([])
    });
    this.onFormValueChange()
    //  this.characteristicsFormArray = this.form.get('characteristics') as FormArray;
    // this.characteristics.forEach(characteristic => {
    //  this.characteristicsFormArray.push(this.createFormCharacteristic(characteristic));
    // });
  }

}
