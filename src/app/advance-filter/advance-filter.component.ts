import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ReApiService } from '../re-api.service';
import * as moment from 'moment';
import { ReService } from '../re.service';


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
  @Input() characteristicsChecked = [];
  @Input() isImmediatelyEntery = false;
  floorArray = [];
  minFloorArray = [];
  maxFloorArray = [];

  constructor(private formBuilder: FormBuilder, private reApiService: ReApiService, public reService: ReService) { }
  onFloorClicked(maxOrMin, e) {
    if (maxOrMin === 'max') {
      this.reService.isMaxFloorClicked = !this.reService.isMaxFloorClicked;
      this.reService.isMinFloorClicked = false;

    } else {
      this.reService.isMinFloorClicked = !this.reService.isMinFloorClicked;
      this.reService.isMaxFloorClicked = false;

    }
    e.stopPropagation()
  }
  onChooseFloor(num, maxOrMin) {
    if (maxOrMin === 'max') {
      if (num) {
        this.minFloorArray = this.floorArray.filter(n => n <= num);
      } else {
        this.minFloorArray = this.floorArray;
      }
      return this.form.controls.maxFloor.setValue(num ? num : '')
    }
    if (maxOrMin === 'min') {
      if (num) {
        this.maxFloorArray = this.floorArray.filter(n => n >= num);
      } else {
        this.maxFloorArray = this.floorArray;
      }
      return this.form.controls.minFloor.setValue(num ? num : '')
    }
  }

  onCheckCharacteristic(characteristic) {

    if (this.characteristicsChecked.includes(characteristic)) {
      this.characteristicsChecked = this.characteristicsChecked.filter(ch => ch !== characteristic);
    } else {
      this.characteristicsChecked.push(characteristic);
    }
    this.form.controls.characteristics.setValue(this.characteristicsChecked)
  }
  onSubmit() {
    this.reApiService.getFilterRE();
    this.reApiService.postFilterRE();
  }
  onClear() {
    this.form.reset();
    this.isImmediatelyEntery = false;
    this.characteristicsChecked = [];
  }
  onImmediatelyEntery() {
    this.isImmediatelyEntery = !this.isImmediatelyEntery;
    this.form.controls.enteryDate.setValue(this.isImmediatelyEntery ? moment().format('YYYY-MM-DD') : '');
  }
  onFormValueChange() {
    this.form.valueChanges.subscribe(value => {
      let formValue;
      formValue = {
        ...value, enteryDate: value.enteryDate, floor: { min: formValue.minFloor, max: formValue.maxFloor },
        size: { min: formValue.minSize, max: formValue.maxSize }
      }
      this.reApiService.advanceSearchDetails = formValue;
    });
  }
  populateRoomsArray() {
    for (let i = -1; i <= 17; i++) {
      this.floorArray.push(i);
    }
    this.minFloorArray = this.floorArray;
    this.maxFloorArray = this.floorArray;
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      maxFloor: '',
      minFloor: '',
      maxSize: '',
      minSize: '',
      enteryDate: '',
      freeSearch: '',
      characteristics: ''
    });
    this.onFormValueChange();
    this.populateRoomsArray()
    this.reService.isMinFloorClicked = false;
    this.reService.isMaxFloorClicked = false;
  }

}
