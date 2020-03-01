import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ReApiService } from './re-api.service';
import { ReService } from './re.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private reApiService: ReApiService, private reService: ReService) {
  }
  isAdvanceSearchClicked = false;
  ngOnInit(): void {
    this.reService.isAdvanceSearchClickedSubject.subscribe(isCkicked => {
      this.isAdvanceSearchClicked = isCkicked;
    });
  }

  // onClickApp(){
  //   this.reApiService.closeBars.next(false);
  // }
}
