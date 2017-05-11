import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterialModule, MdDialogRef } from '@angular/material';
import { DataTableModule } from 'angular2-datatable';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdDataTableModule } from 'ng2-md-datatable';
import { Md2DataTable, Md2Module } from 'md2';

import { AppComponent } from './app.component';
import { NoticeCreateEditComponent } from './notice-create-edit/notice-create-edit.component';
import { NoticeDeleteComponent } from './notice-delete/notice-delete.component';
import { NoticeListComponent } from './notice-list/notice-list.component';
import { StatusSnackComponent } from './status-snack/status-snack.component';
import { PanelComponent } from './panel/panel.component';
import { NoticeService, StatusPipe, NamePipe, StatusDialogService, NotificationDbService, SharedService } from './shared';
import { routes } from './app.routes'; 

@NgModule({
  declarations: [
    AppComponent,
    NoticeCreateEditComponent,
    NoticeDeleteComponent,
    NoticeListComponent,
    StatusSnackComponent,
    StatusPipe,
    NamePipe,
    PanelComponent
  ],
  entryComponents: [
    StatusSnackComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    MaterialModule.forRoot(),
    Md2Module.forRoot(),
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
    NotificationDbService,
    Md2DataTable,
    SharedService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
