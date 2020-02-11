import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ReApiService } from './re-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor( private reApiService:ReApiService){

  }
  title = 'yad2-imitation';
  onClickApp(){
    this.reApiService. closeBars.next(false);
  }
}
