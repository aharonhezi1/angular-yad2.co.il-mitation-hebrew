import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ReService {

isOpenSortComponentBarsSubject = new BehaviorSubject<boolean>(false);
isAdvanceSearchClickedSubject=new BehaviorSubject<boolean>(false);
 // sortOptions = new BehaviorSubject<sortByModel>({ sortBy: 'byDate', isOnlyWithPic: false, isOnlyWithPrice: false });
 isMaxFloorClicked = false;
 isMinFloorClicked = false;

  constructor() { }
}
export class sortByModel {
  sortBy: string;
  isOnlyWithPic: boolean;
  isOnlyWithPrice: boolean;
}
