import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Notice, NoticeService } from '../shared/index';
//import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-notice-delete',
  templateUrl: './notice-delete.component.html',
  styleUrls: ['./notice-delete.component.css']
})
export class NoticeDeleteComponent implements OnInit {  
    private _currentNotice: Notice;
    private _errorMessage: string;
    //private noticeForm: FormGroup;

    constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _service: NoticeService
  ) { }

  ngOnInit() {
    this.getNoticeFromRoute();
  }

  private getNoticeFromRoute() {
    this._activatedRoute.params.forEach((params: Params) => {
      let id = params['id'];

      if (id) {
        this._service.getNotice(id).subscribe(
          notice => {
            this._currentNotice = notice;
            console.log('del this._currentNotice.priority' + this._currentNotice.priority);
            console.log('del this._currentNotice.showpriority' + this._currentNotice.showpriority);
            console.log('del this._currentNotice.status' + this._currentNotice.status);
           // this.noticeForm.patchValue(this._currentNotice);
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
        notice => this._currentNotice = notice,
        error => this._errorMessage = error
      );
      this._router.navigate(['/notices']);
  }

   private goBack() {
    this._router.navigate(['/notices']);
  }

}
