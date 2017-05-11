import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Notice, NoticeService, NotificationDbService } from '../shared';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-notice-delete',
  templateUrl: './notice-delete.component.html'
})
export class NoticeDeleteComponent implements OnInit {
  private _currentNotice: Notice;
  private _errorMessage: string;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _service: NoticeService,
    private _snackBar: MdSnackBar,
    private _notificationDb: NotificationDbService
  ) { }

  ngOnInit() {
    this.getNoticeFromRoute();
  }

  private getNoticeFromRoute() {
    this._activatedRoute.params.forEach((params: Params) => {
      if (params['id']) {
        this._service.getNotice(params['id']).subscribe(
          notice => {
            this._currentNotice = notice;
          },
          error => this._errorMessage = error
        );
      } else {
        this.goBack();
      }
    });
  }

  private deleteNotice() {
    this._service.deleteNotice(this._currentNotice)
      .subscribe(
      () => {
        this._service.getNotices();
        this._notificationDb.callBar('deleting the data was successfuly!');
        this._router.navigate(['/notices']);
      },
      error => this._errorMessage = error
      );
  }

  private goBack() {
    this._router.navigate(['/notices']);
  }
}
