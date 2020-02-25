import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule,FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { ReHeaderComponent } from './re-header/re-header.component';
import { ReFilterComponent } from './re-filter/re-filter.component';
import { ReListComponent } from './re-list/re-list.component';
import { ItemComponent } from './re-list/item/item.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { ReSortComponent } from './re-sort/re-sort.component';
import { AddPageHeaderInterceptor } from './interceptors/add-page-header';
import { PagingComponent } from './paging/paging.component';


@NgModule({
  declarations: [
    AppComponent,
    ReHeaderComponent,
    ReFilterComponent,
    ReListComponent,
    ItemComponent,
    ReSortComponent,
    PagingComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    ClickOutsideModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AddPageHeaderInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
