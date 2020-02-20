import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReApiService } from '../re-api.service';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ReService } from '../re.service';
import sortByKey from '../../assets/sort-by-key'
@Component({
  selector: 'app-re-list',
  templateUrl: './re-list.component.html',
  styleUrls: ['./re-list.component.scss']
})
export class ReListComponent implements OnInit, OnDestroy {
  reList = [];
  sortBy;
  isWithPic;
  isWithPrice;
  subscription = new Subject();
  sortLastOptions; // = this.reService.sortOptions.value;

  // reType = 'forsale';
  constructor(private reApiService: ReApiService, private reService: ReService) { }
  sortByKey = sortByKey;
  // sortbykey = (array, key) => array.sort((a, b) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0))

  ngOnInit() {
    this.reApiService.getRE();
    this.reApiService.reListSubject.subscribe((list: any) => {
      this.reList = list;
      console.log(this.reList);

    });
    this.reService.sortOptions.subscribe(sort => {
      this.reList = this.reApiService.reListSubject.value;

      if (!!this.reList) {
        this.reList = this.reList.filter(item => {
          if (sort.isOnlyWithPic) {
            if (sort.isOnlyWithPrice) {
              return !!item.price && !!item.pictures.length;
            } else {
              return !!item.pictures.length;
            }
          } else {
            if (sort.isOnlyWithPrice) {
              return !!item.price;
            } else {
              return item;
            }
          }
        });
        if (this.sortLastOptions.sortBy !== sort.sortBy) {
          switch (sort.sortBy) {
            case 'byDate':
              this.reList = this.sortByKey(this.reList, 'updatedAt');

              break;
            case 'fromLowPrice':
              this.reList = this.sortByKey(this.reList, 'price');
              break;
            case 'fromHighPirce':
              this.reList = this.sortByKey(this.reList, 'price', -1);
              break;

          }
        }
        //this.reList = this.sortByKey(this.reList, 'price', -1)
      }
      this.sortLastOptions = this.reService.sortOptions.value;

    });


  }
  ngOnDestroy() {
    this.subscription.next();
    this.subscription.complete();
  }

}
