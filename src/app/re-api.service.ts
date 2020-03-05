import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { sortByModel } from './re.service';


@Injectable({
  providedIn: 'root'
})
export class ReApiService {
  // closeBars = new BehaviorSubject<boolean>(false);
  currentPage = 1;
  pageNumberSubject = new BehaviorSubject<number>(0);
  reListSubject = new BehaviorSubject<any>(null);
  searchDetails;// = new BehaviorSubject<any>(null);
  advanceSearchDetails; //= new BehaviorSubject<any>(null);

  reParams = '/api/real-estate/';
  reType = 'forsale';
  queryParams = '';
  advanceQueryParams = '';
  sortOptions: sortByModel = { sortBy: 'byDate', isOnlyWithPic: false, isOnlyWithPrice: false }

  constructor(private http: HttpClient) { }
  turnObjToQueryParams(obj) {
    let queryParams = '';
    if (!!obj) {
      Object.keys(obj).forEach(detail =>
        queryParams += `${detail}=${obj[detail]}&`);
      return queryParams.slice(0, queryParams.length - 1);
    }
  }
  getRE = (type = this.reType) => {
    // console.log(environment.apiUrl + this.reParams + type);

    return this.http.get(environment.apiUrl + this.reParams + type).subscribe((list: any) => {
      this.reListSubject.next(list.re);
      this.pageNumberSubject.next(list.pageNum);
      // console.log(this.pageNumber.value);
    });
  }
//  getFilterRE = (details = null, advanceDetails = null) => {
 getFilterRE = (details = this.searchDetails, advanceDetails = this.advanceSearchDetails) => {

    this.queryParams = this.turnObjToQueryParams(details) || this.queryParams;
    this.advanceQueryParams = this.turnObjToQueryParams(advanceDetails) || this.advanceQueryParams;
    const query = environment.apiUrl + this.reParams + this.reType +
      (!!this.queryParams || !!this.advanceQueryParams ? '?' : '') +
      this.queryParams + (!!this.advanceQueryParams && !!this.queryParams ? '&' : '') + this.advanceQueryParams;
    return this.http.get(query)
      .subscribe((list: any) => {
        this.reListSubject.next(list.re);
        this.pageNumberSubject.next(list.pageNum);
      });
  }
  postSearchAddress(address) {
    console.log(address);
    return this.http.post(environment.apiUrl + this.reParams + 'find-address', { address })
  }
}
