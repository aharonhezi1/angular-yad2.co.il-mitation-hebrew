import { Component, OnInit, Input } from '@angular/core';
import { translate } from '../../../assets/translate';


@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.scss']
})
export class CheckBoxComponent implements OnInit {
  @Input() option: string;
  @Input() isChecked = false;;
  translate = translate;
  constructor() { }

  ngOnInit() {
  }

}
