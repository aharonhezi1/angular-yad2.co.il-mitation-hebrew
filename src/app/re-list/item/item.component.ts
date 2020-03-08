import { Component, OnInit, Input } from '@angular/core';
import { decamelize } from '../../../assets/decamelize';
import { translate } from '../../../assets/translate';
import { environment } from './../../../environments/environment';
import { UserApiService } from 'src/app/user-api.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  phonePicUrl = environment.apiUrl + '/icons/phone.png';
  isShowOwnerClicked = false;
  owner:any;
  defaultPic = '../../../assets/feed_img_placeholder_small.jpg';
  translate = translate;
  @Input() re: any;
  constructor(private userApiService: UserApiService) { }
  isItemOpen = false;
  propertyDetailsCol = [];
  decamelizePropertyDetailsCol = [];
  aboutCol = [];
  decamelizeAboutCol = []

  onItemClicked() {
    this.isItemOpen = !this.isItemOpen;
  }
  onClickShowOwner(e) {
    this.isShowOwnerClicked = !this.isShowOwnerClicked;
    this.userApiService.getOwner(this.re.owner).subscribe(user => {
      this.owner = user;
      console.log(this.owner);
    })
    e.stopPropagation();

  }
  onClickDetails(e) {
    e.stopPropagation();
  }
  ngOnInit() {
    //  console.log(this.re);
    this.propertyDetailsCol = Object.keys(this.re.propertyDetails);
    this.propertyDetailsCol = this.propertyDetailsCol.slice(1);

    this.decamelizePropertyDetailsCol = this.propertyDetailsCol.map(detail => {
      return decamelize(detail, ' ');
    });
    this.aboutCol = Object.keys(this.re.about);
    this.aboutCol = this.aboutCol.slice(1, this.aboutCol.length - 1);
    this.decamelizeAboutCol = this.aboutCol.map(detail => {
      return decamelize(detail, ' ');
    });
  }

}
