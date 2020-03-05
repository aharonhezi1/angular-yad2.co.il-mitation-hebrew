import { Component, OnInit } from '@angular/core';
import { environment } from './../../environments/environment';
import { ReApiService } from '../re-api.service';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.scss']
})
export class PagingComponent implements OnInit {
  grayArrowLink = environment.apiUrl + '/icons/grayArrow.png';
  orangeArrowLink = environment.apiUrl + '/icons/orangeArrow.png';
  pagesArray;
  Math = Math;

  constructor(public reApiService: ReApiService) { }

  pageNumber;
  onClickPage(page) {
    // tslint:disable-next-line: radix
    this.reApiService.currentPage = parseInt(page);
    this.reApiService.getFilterRE();
  }
  onClickArrow(isUp) {
    this.reApiService.currentPage += isUp ? 1 : -1;
    this.reApiService.getFilterRE();
  }
  createPagesArray() {
    this.pagesArray = [1]
    for (let i = 2; i <= Math.floor(this.pageNumber); i++) {
      if (this.pageNumber > 9) {
        if ((i === Math.ceil(this.pageNumber) - 1 && i > this.reApiService.currentPage + 1) ||
          (this.reApiService.currentPage > 3 && i === 2)) {
          this.pagesArray.push('...');
          continue;
        }
        if ((((this.reApiService.currentPage + 2 < i) && i > 7) || i < this.reApiService.currentPage - 6)) {
          continue;
        }
      }
      if (i !== this.pageNumber) {
        this.pagesArray.push(i + '');
      }
    }
    if (this.pageNumber > 1) {
      this.pagesArray.push(Math.ceil(this.pageNumber))

    }

  }
  ngOnInit() {
    this.reApiService.pageNumberSubject.subscribe(num => {
      this.pageNumber = num;
      console.log('createPagesArray');
      this.createPagesArray();

    });
  }

}
