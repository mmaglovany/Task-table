import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Notice, NoticeService, Status, Icons, NotificationDbService } from '../shared';

@Component({
  selector: 'app-notice-create-edit',
  templateUrl: './notice-create-edit.component.html'
})
export class NoticeCreateEditComponent implements OnInit {
  private _currentNotice: Notice;
  private _status = Status;
  private _icons = Icons;
  private _errorMessage: string;
  private _noticeForm: FormGroup;
  private _isRequired = false;
  private _signForForm: string;

  constructor(
    private _service: NoticeService,
    private _activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
    private _router: Router,
    private _notificationDb: NotificationDbService
  ) { }

  ngOnInit() {
    this.buildForm();
    this.getNoticeFromRoute();
  }

  public onSubmit(noticeForm: FormGroup) {
    this._currentNotice.name = noticeForm.value.name;
    this._currentNotice.status = noticeForm.value.status;
    this._currentNotice.priority = noticeForm.value.priority;
    this._currentNotice.showpriority = true;

    if (this._currentNotice.id) {
      this._service.updateNotice(this._currentNotice)
        .subscribe(
        () => {
          this._notificationDb.callBar('Editing and saving was successfuly!');
          this.goBack();
        },
        error => this._errorMessage = error
        );
    } else {
      this._service.addNotice(this._currentNotice)
        .subscribe(
        () => {
          this._notificationDb.callBar('saving the new data was successfuly!');
          this.goBack();
        },
        error => this._errorMessage = error
        );
    }
  }

  private goBack() {
    this._router.navigate(['/notices']);
  }

  private getNoticeFromRoute() {
    this._activatedRoute.params.forEach((params: Params) => {

      if (params['id']) {
        this._service.getNotice(params['id']).subscribe(
          notice => {
            this._currentNotice = notice;
            this._noticeForm.patchValue(this._currentNotice);
            this._signForForm = 'Edit';
          },
          error => this._errorMessage = error
        );
      } else {
        this._currentNotice = new Notice(null, null, null, null, true);
        this._noticeForm.patchValue(this._currentNotice);
        this._signForForm = 'Add';
      }
    });
  }

  private buildForm() {
    this._noticeForm = this._fb.group({
      name: ['', Validators.required],
      status: ['', Validators.required],
      priority: ['', Validators.required],
      showpriority: ['', Validators.required]
    });
  }

  private getNameFromEnum() {
    const objValues = Object.keys(Status).map(k => Status[k]);
    return objValues.filter(v => typeof v === 'string') as string[];
  }
}
