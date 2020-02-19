import { Component, OnInit } from '@angular/core';
import { environment } from './../../environments/environment';
import { translate } from '../../assets/translate';
import { ReService } from '../re.service';


@Component({
  selector: 'app-re-sort',
  templateUrl: './re-sort.component.html',
  styleUrls: ['./re-sort.component.scss']
})
export class ReSortComponent implements OnInit {
  translate = translate;
  sortByOptions = ['byDate', 'fromLowPrice', 'fromHighPirce'];
  sortBy = this.sortByOptions[0];
  isShowAddsWithPrice = false;
  isShowAddsWithPicture = false;
  isShowSortBy = false;
  picUrl = environment.apiUrl + '/icons/picIcon.svg';
  picOrangeUrl = environment.apiUrl + '/icons/picIconOrange.png';

  mapPicUrl = environment.apiUrl + '/icons/mapIcon2.png';
  constructor(private reServicce: ReService) { }
  onClickOutsideSortBy() {
    this.isShowSortBy = false;
  }
  onClick(id, e, option) {
    switch (id) {
      case 'sortBy':
        this.isShowSortBy = !this.isShowSortBy;
        e.stopPropagation()
        return;
      case 'price':
        this.isShowAddsWithPrice = !this.isShowAddsWithPrice;
        this.reServicce.sortOptions.next({ ...this.reServicce.sortOptions.value, isOnlyWithPrice: this.isShowAddsWithPrice })
        return;
      case 'picture':
        this.isShowAddsWithPicture = !this.isShowAddsWithPicture;
        this.reServicce.sortOptions.next({ ...this.reServicce.sortOptions.value, isOnlyWithPic: this.isShowAddsWithPicture })
        return;
      case 'sortByOptions':
        this.sortBy = option;
        this.isShowSortBy = false;
        this.reServicce.sortOptions.next({ ...this.reServicce.sortOptions.value, sortBy: this.sortBy })
        return;
    }

  }

  ngOnInit() {
    this.reServicce.isOpenSortComponentBarsSubject.subscribe(isClose => {
      this.isShowSortBy = isClose;
    })
  }

}
