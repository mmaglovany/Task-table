import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterialModule, MdDialogRef } from '@angular/material';
import {DataTableModule} from 'angular2-datatable';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MdDataTableModule } from 'ng2-md-datatable';

import { AppComponent } from './app.component';
import { NoticeCreateEditComponent } from './notice-create-edit/notice-create-edit.component';
import { NoticeDeleteComponent } from './notice-delete/notice-delete.component';
import { NoticeListComponent } from './notice-list/notice-list.component';
import { NoticeService } from './shared/index';
import { routes } from './app.routes';
import { StatusSnackComponent } from './status-snack/status-snack.component';
import { PrioritySnackComponent } from './priority-snack/priority-snack.component';
import { SharedService } from './shared-service.service';
import { StatusDialogService } from './shared/services/statusDialogService';

@NgModule({
  declarations: [
    AppComponent,
    NoticeCreateEditComponent,
    NoticeDeleteComponent,
    NoticeListComponent,
    StatusSnackComponent,
    PrioritySnackComponent
  ],
  entryComponents: [
    StatusSnackComponent,
    PrioritySnackComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    MaterialModule.forRoot(),
    DataTableModule,
    BrowserAnimationsModule,
    MdDataTableModule
  ],
  exports: [
    ReactiveFormsModule
  ],
  providers: [
    NoticeService,
    SharedService,
   StatusDialogService,
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
