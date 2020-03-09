import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ReApiService } from '../re-api.service';
import { translate } from '../../assets/translate';
import { ReService } from '../re.service';
import { splitBySearchExp } from '../../assets/splitBySearchExp'
import { from } from 'rxjs';
@Component({
  selector: 'app-re-filter',
  templateUrl: './re-filter.component.html',
  styleUrls: ['./re-filter.component.scss']
})
export class ReFilterComponent implements OnInit, AfterViewInit {
  constructor(private formBuilder: FormBuilder, public reApiService: ReApiService, public reService: ReService) { }
  propertyTypeOption = {
    apartment: 'דירה', penthouse: 'פאנטהאוס', 'private house': 'בית פרטי', duplex: 'דופלקס',
    'land plot': 'מגרשים',
    'tow-family': 'דו משפחתי',
    'vacation house': 'דירת נופש',
    basement: 'מרתף/פרטר',
    triplex: 'טריפלקס',
    unit: 'יחידת דיור',
    possession: 'משק/נחלה',
    'auxiliary-farm': 'חוות עזר',
    bulding: 'בניין מגורים',
    general: 'כללי'
  };
  splitBySearchExp = splitBySearchExp;
  addresses = { streets: [], cities: [] };
  reTypes = ['forsale', 'forRent', 'roommates', 'commercial'];
  translate = translate;
  isHeaderLinkClicked = false;
  propertyTypeOptions = Object.keys(this.propertyTypeOption);
  propertyTypeOptionsHebrew = Object.values(this.propertyTypeOption);
  propertyTypesChecked = [];
  isPropertyTypeClicked = false;
  isRoomsClicked = false;
  isRoomSelectMinClicked = false;
  isRoomSelectMaxClicked = false;
  isMorePropertiesClicked = false;
  isAddressClicked = false;
  isAddressChosen = false;
  chosenRooms = {
    max: null, min: null
  };
  // chosenRooms.max;
  // chosenRooms.min;
  roomsArray = [];
  maxRoomArray = [];
  minRoomArray = [];
  form: FormGroup;

  onClickREtype(type: string) {
    // console.log(type);
    this.reApiService.reType = type;
    this.reApiService.getRE(type);
  }
  onHeaderLinkClicked(e) {
    this.isHeaderLinkClicked = !this.isHeaderLinkClicked;
  }
  onClickRoomSelectMin(e) {
    this.isRoomSelectMinClicked = !this.isRoomSelectMinClicked;
    this.isRoomSelectMaxClicked = false;
    e.stopPropagation();

  }
  onClickRoomSelectMax(e) {
    this.isRoomSelectMaxClicked = !this.isRoomSelectMaxClicked;
    this.isRoomSelectMinClicked = false;
    e.stopPropagation();

  }
  onClickPropertyType(e) {
    this.reService.isOpenSortComponentBarsSubject.next(false)

    this.isAddressClicked = false;

    this.isPropertyTypeClicked = !this.isPropertyTypeClicked;
    this.isRoomsClicked = false;
    e.stopPropagation();


  }
  onClickedRooms(e) {
    this.reService.isOpenSortComponentBarsSubject.next(false)

    this.isAddressClicked = false;
    this.isRoomsClicked = !this.isRoomsClicked;
    this.isPropertyTypeClicked = false;
    this.isRoomSelectMinClicked = false;
    this.isRoomSelectMaxClicked = false;
    e.stopPropagation();
  }
  onChooseRoomsNum(maxOrMin, e?, num?, ) {
    if (maxOrMin === 'max') {
      this.chosenRooms.max = num;
      this.isRoomSelectMaxClicked = false;

    }
    if (maxOrMin === 'min') {
      this.chosenRooms.min = num;
      this.isRoomSelectMinClicked = false;
    }
    const { max, min } = this.chosenRooms;
    let addition = '';
    if (max) {
      if (!min) {
        addition = '  עד-';
      }
    } else if (min) {
      addition = ' מ- ';
    }
    e.stopPropagation();

    this.form.controls.rooms.setValue(
      ((addition) + (min ? min : '') + (max && min ? ' - ' : '') + (max ? max : ''))
    );
    this.populateMaxNMinRoomsArray(num, maxOrMin);
  }
  onClickMoreProperties() {

    this.isMorePropertiesClicked = !this.isMorePropertiesClicked;
  }


  onCheckbox(e, option) {
    if (e.target.checked) {
      this.propertyTypesChecked.push(option);
    } else {
      this.propertyTypesChecked = this.propertyTypesChecked.filter(op => op !== option);
    }
    if (this.propertyTypesChecked.length > 1) {
      this.form.controls.propertyType.setValue(this.propertyTypesChecked.length + ' נכסים');
    } else {
      this.form.controls.propertyType.setValue(this.propertyTypeOption[this.propertyTypesChecked[0]]);
    }
  }
  onClickAdvanceSerch() {
    this.reService.isAdvanceSearchClickedSubject.next(!this.reService.isAdvanceSearchClickedSubject.value);
  }
  onSubmit() {
    // let formValue = this.form.value;
    // formValue = {
    //   ...formValue, propertyType: this.propertyTypesChecked,
    //   address: this.isAddressChosen ? formValue.address : '',
    //   maxRooms: this.chosenRooms.max ? this.chosenRooms.max : 12,
    //   minRooms: this.chosenRooms.min ? this.chosenRooms.min : 0
    // };
    this.reApiService.getFilterRE();
  }
  populateRoomsArray() {
    for (let i = 2; i <= 24; i++) {
      this.roomsArray.push(i / 2);
    }
    this.minRoomArray = this.roomsArray;
    this.maxRoomArray = this.roomsArray;
  }

  populateMaxNMinRoomsArray(roomNum, maxOrMin) {
    if (maxOrMin === 'max') {
      if (!roomNum) {
        return this.minRoomArray = this.roomsArray;
      }
      return this.minRoomArray = this.roomsArray.filter(num => num <= roomNum);
    }
    if (maxOrMin === 'min') {
      if (!roomNum) {
        return this.maxRoomArray = this.roomsArray;
      }
      this.maxRoomArray = this.roomsArray.filter(num => num >= roomNum);
    }
  }
  onChooseAddress(address, e) {
    this.isAddressChosen = true;
    console.log(address);

    this.form.controls.address.setValue(address)
    e.stopPropagation()
  }
  onChangeAddress(e) {
    this.reService.isOpenSortComponentBarsSubject.next(false)

    this.isAddressChosen = false;

    this.isRoomsClicked = false;

    this.isPropertyTypeClicked = false;

    this.isAddressClicked = false;
    const input = this.form.value.address + ""
    if (input.length > 1) {
      // this.reApiService.postMongoSearchAddress(input).subscribe((addresses: any) => {
      //   this.addresses = addresses;
      //   console.log(addresses);
        
      //   this.isAddressClicked = addresses.streets.length || addresses.cities.length;

      // });   
        this.reApiService.postSearchAddress(input).subscribe((addresses: any) => {
        this.addresses = addresses;
        this.isAddressClicked = addresses.streets.length || addresses.cities.length;

      });
    }
    e.stopPropagation()

  }
  onClickOutSideBar(e, id) {
    switch (id) {
      case 'headerLink':
        return this.isHeaderLinkClicked = false;
      case 'propertyType':
        this.isPropertyTypeClicked = false;
        return e.stopPropagation();
      case 'roomsOptions':
        this.isRoomsClicked = false;
        this.isRoomSelectMaxClicked = false;
        this.isRoomSelectMinClicked = false;
        return e.stopPropagation();
      case 'adrressesOptions':
        this.isAddressClicked = false;
        return e.stopPropagation();


    }
    this.isHeaderLinkClicked = false;

  }
  onFormValueChange() {
    this.form.valueChanges.subscribe(value => {
      let formValue =value;
      formValue = {
        ...formValue, propertyType: this.propertyTypesChecked,
        address: this.isAddressChosen ? formValue.address : '',
        maxRooms: this.chosenRooms.max ? this.chosenRooms.max : 12,
        minRooms: this.chosenRooms.min ? this.chosenRooms.min : 0
      };
      this.reApiService.searchDetails = formValue;
    });
  }
  ngOnInit() {
    this.form = this.formBuilder.group({
      address: '',
      propertyType: '',
      rooms: '',
      minPrice: '',
      maxPrice: ''
    });
    this.onFormValueChange()
    this.populateRoomsArray();


  }
  ngAfterViewInit() {

  }
}
