import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Notice, NoticeService } from '../shared/index';
import { MdDialog } from '@angular/material';
import { DataTableModule } from 'angular2-datatable';
import { MdSnackBar } from '@angular/material';
import { Md2DataTable } from 'md2';

import { StatusDialogService, SharedService, Status, Icons, NotificationDbService } from '../shared';

@Component({
  selector: 'app-notice-list',
  templateUrl: './notice-list.component.html',
  styleUrls: ['./notice-list.component.css']
})
export class NoticeListComponent implements OnInit {
  private _disableButton: boolean;
  private _isBlur: boolean;
  private _choiseStatus = false;
  private _disableSave = true;
  private _idItemSelected: string;
  private _different = 0;
  private _notices: Notice[];
  private _note: Notice;
  private _errorMessage: string;
  private _showPriority = true;
  private _priority: number;
  private _search: string = null;

  constructor(
    private _service: NoticeService,
    private _router: Router,
    private _snackBar: MdSnackBar,
    private _sharedService: SharedService,
    private _notificationDb: NotificationDbService,
    private mdDialog: MdDialog,
    private _statusDialog: StatusDialogService
  ) {
    this._sharedService.newData$.subscribe(
      data => {
        console.log(data);
        this.getNotices();
      });
  }

  ngOnInit() {
    this._disableButton = true;
    this.getNotices();
  }

  private refresh() {
    this.getNotices();
  }

  private editNotice() {
    this._router.navigate(['notices', 'edit', this._note.id]);
  }

  private deleteNotice() {
    this._router.navigate(['notices', 'delete', this._note.id]);
  }
  private createNotice() {
    this._router.navigate(['notices', 'create']);
  }

  private getNotices() {
    this._service.getNotices().subscribe(
      notices => this._notices = notices,
      error => this._errorMessage = error
    );
  }

  private setCurrentNotice(notice: Notice) {
    this._note = notice;
  }

  private openStatusChoise(notice: Notice) {
    if (this._isBlur && this._idItemSelected !== notice.id && this._different !== 0) {
      this._note.showpriority = true;
      this.updateNewData(this._note, 'priority field changed and saved successfuly!');
      this._idItemSelected = notice.id;
      this._isBlur = true;
      this._different = 0;
    } else {
      this._statusDialog
        .confirm('Confirm Status', 'Choise a new status for the note!')
        .subscribe(res => {
          if (res) {
            notice.status = Status[res];
            this.updateNewData(notice, 'status field changed and saved successfuly!');
          }
        });
    }
  }

  private convertStatusToIcon(status: string) {
    return Icons[Status[status]];
  }

  private startChangePriority(notice: Notice) {
    if (this._isBlur && this._idItemSelected !== notice.id && this._different !== 0) {
      this._note.showpriority = true;
      this.updateNewData(this._note, 'priority field changed and saved successfuly!');
      this._idItemSelected = notice.id;
      this._isBlur = true;
      this._different = 0;
    }
    notice.showpriority = false;
    this._idItemSelected = notice.id;
  }

  private changePriority(item: number, notice: Notice) {
    this._different = +this._different + item;
    notice.showpriority = true;
    this._showPriority = false;
    notice.priority = notice.priority + item;
    this._priority = notice.priority;

  }

  private saveChangePriority(notice: Notice) {
    this._note = notice;
    this._isBlur = true;
  }

  private updateNewData(notice: Notice, field: string) {
    this._service.updateNotice(notice)
      .subscribe(
      () => this._notificationDb.callBar(field),
      error => this._errorMessage = error
      );
  }

  private getNameFromEnum() {
    const objValues = Object.keys(Status).map(k => Status[k]);
    return objValues.filter(v => typeof v === 'string') as string[];
  }

  private getNameForToolTip() {
    const objValues = Object.keys(Status).map(k => Status[k]);
    return objValues.filter(v => typeof v === 'string') as string[];
  }

}
