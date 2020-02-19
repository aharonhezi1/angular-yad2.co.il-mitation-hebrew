import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReApiService } from '../re-api.service';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ReService } from '../re.service';
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
  // reType = 'forsale';
  constructor(private reApiService: ReApiService, private reService: ReService) { }

  ngOnInit() {


    this.reApiService.getRE();
    this.reApiService.reListSubject.subscribe((list: any) => {
      this.reList = list;
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
        
      }
    });


  }
  ngOnDestroy() {
    this.subscription.next();
    this.subscription.complete();
  }

}
