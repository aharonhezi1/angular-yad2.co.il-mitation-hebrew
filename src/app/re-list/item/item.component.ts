import { Component, OnInit, Input } from '@angular/core';
import { decamelize } from '../../../assets/decamelize';
import {translate} from '../../../assets/translate';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  translate= translate;
  @Input() re: any;
  constructor() { }
  isItemOpen = false;
  propertyDetailsCol = [];
  decamelizePropertyDetailsCol = [];
  aboutCol = [];
  decamelizeAboutCol = []

  onItemClicked() {
    this.isItemOpen = !this.isItemOpen; 
  }
  ngOnInit() {
  //  console.log(this.re);
    this.propertyDetailsCol = Object.keys(this.re.propertyDetails);
    this.propertyDetailsCol = this.propertyDetailsCol.slice(1);

    this.decamelizePropertyDetailsCol = this.propertyDetailsCol.map(detail => {
      return decamelize(detail, ' ');
    });
    this.aboutCol = Object.keys(this.re.about);
    this.aboutCol = this.aboutCol.slice(1, this.aboutCol.length - 1);
    this.decamelizeAboutCol = this.aboutCol.map(detail => {
      return decamelize(detail, ' ');
    });
  }

}
