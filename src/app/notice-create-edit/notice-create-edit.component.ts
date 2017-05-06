import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Notice, NoticeService, Status, Priority } from '../shared/index';

@Component({
  selector: 'app-notice-create-edit',
  templateUrl: './notice-create-edit.component.html',
  styleUrls: ['./notice-create-edit.component.css']
})
export class NoticeCreateEditComponent implements OnInit {
  currentNotice: Notice;
  keys: any[];
  ranges: any[];
  status = Status;
  state: number;
  priorities = Priority;
  order: number;
  errorMessage: string;
  noticeForm: FormGroup;
  constructor(
    private service: NoticeService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.buildForm();
    this.getNoticeFromRoute();
    // this.keys = Object.keys(this.status).filter(Number);
    // this.state = Status.Canceled;
    // this.ranges = Object.keys(this.priorities).filter(Number);
    // this.order = 0;//Default the value
     
  }

  public checkError(element: string, errorType) {
    return this.noticeForm.get(element).hasError(errorType) &&
      this.noticeForm.get(element).touched;
  }

  public onSubmit(noticeForm: FormGroup) {
    this.currentNotice.name = noticeForm.value.name;
    this.currentNotice.status = noticeForm.value.status;
    this.currentNotice.priority = noticeForm.value.priority;
    this.currentNotice.showpriority = true;
     console.log('this.currentNotice.showPriority=' + this.currentNotice.showpriority);
    if (this.currentNotice.id) {
      this.service.updateNotice(this.currentNotice)
        .subscribe(
        () => this.goBack(),
        error => this.errorMessage = error
        );
    } else {
      this.service.addNotice(this.currentNotice)
        .subscribe(
        () => this.goBack(),
        error => this.errorMessage = error
        );
    }
  }

  private goBack() {
    this.router.navigate(['/notices']);
  }

  private getNoticeFromRoute() {
    this.activatedRoute.params.forEach((params: Params) => {
      let id = params['id'];

      if (id) {
        this.service.getNotice(id).subscribe(
          notice => {
            this.currentNotice = notice;
            this.noticeForm.patchValue(this.currentNotice);
          },
          error => this.errorMessage = error
        );
      } else {
        this.currentNotice = new Notice(null, null, null, null, true);
        this.noticeForm.patchValue(this.currentNotice);
      }
    });
  }

  private buildForm() {
    this.noticeForm = this.fb.group({
      name: ['', Validators.required],
      status: ['', Validators.required],
      priority: ['', Validators.required],
      showpriority: ['', Validators.required]
    });
  }

  private parseSatus(value: string) {
    this.currentNotice.status = Status[value];
  }

  private parsePriority(value: string) {
    this.currentNotice.priority = Priority[value];
  }
}
