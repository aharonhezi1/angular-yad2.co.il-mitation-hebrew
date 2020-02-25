import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { sortByModel } from './re.service';


@Injectable({
  providedIn: 'root'
})
export class ReApiService {
  closeBars = new BehaviorSubject<boolean>(false);
  currentPage = 1;
  pageNumber = new BehaviorSubject<number>(0);
  reListSubject = new BehaviorSubject<any>(null);
  reParams = '/api/real-estate/';
  reType = 'forsale';
  queryParams = '?';
  sortOptions: sortByModel = { sortBy: 'byDate', isOnlyWithPic: false, isOnlyWithPrice: false }

  constructor(private http: HttpClient) { }

  getRE = (type = this.reType) => {
    // console.log(environment.apiUrl + this.reParams + type);

    return this.http.get(environment.apiUrl + this.reParams + type).subscribe((list: any) => {
      this.reListSubject.next(list.re);
      this.pageNumber.next(list.pageNum)
      console.log(this.pageNumber.value);


    });
  }
  getFilterRE = (details = []) => {

    if (!!details) {
      this.queryParams = '?';
      Object.keys(details).forEach(detail =>
        this.queryParams += `${detail}=${details[detail]}&`);
      this.queryParams = this.queryParams.slice(0, this.queryParams.length - 1);
    }
    return this.http.get(environment.apiUrl + this.reParams + this.reType + this.queryParams).subscribe((list: any) => {
      this.reListSubject.next(list.re);
      this.pageNumber.next(list.pageNum)


    });
  }
  postSearchAddress(address) {
    console.log(address);
    return this.http.post(environment.apiUrl + this.reParams + 'find-address', { address })
  }
}
