import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Notice, NoticeService } from '../shared/index';
import { MaterialModule, MdSnackBarRef } from '@angular/material';
import { DataTableModule } from 'angular2-datatable';
import { MdSnackBar } from '@angular/material';
import { StatusSnackComponent } from '../status-snack/status-snack.component';
import { PrioritySnackComponent } from '../priority-snack/priority-snack.component';
import { SharedService } from '../shared-service.service';


@Component({
  selector: 'app-notice-list',
  templateUrl: './notice-list.component.html',
  styleUrls: ['./notice-list.component.css']
})
export class NoticeListComponent implements OnInit {
  private snackBarRef: MdSnackBarRef<any>;
  notices: Notice[];
  note: Notice;
  errorMessage: string;
  showPriority = true;
  priority: number;
  constructor(
    private _service: NoticeService,
    private _router: Router,
    private _snackBar: MdSnackBar,
    private _sharedService: SharedService,
    public statusSnack: MdSnackBar,
    public prioritySnack: MdSnackBar,
  ) {
    this._sharedService.caseNumber$.subscribe(
      data => {
        console.log('NoticeListComponent-received from prioritySnack: ' + data.priority);
        this.note = data;
        if (this.note) {
          this.priority = data.priority;
          //this.updateNewData(this.note);
        }
      }); 
  }

  ngOnInit() {
    //this.getNotices();
    this.refresh();
  }

  public refresh() {
    this.getNotices();
  }

  public editNotice() {
    this._router.navigate(['notices', 'edit', this.note.id]);
  }

  public deleteNotice() {
    this._router.navigate(['notices', 'delete', this.note.id]);
  }
  public createNotice() {
    this._router.navigate(['notices', 'create']);
  }

  public getNotices() {
    this._service.getNotices().subscribe(
      notices => this.notices = notices,
      error => this.errorMessage = error
    );
  }

  public setCurrentNotice(notice: Notice) {
     this.note = notice;
  }

  public openStatusSnack() {
    this.statusSnack.openFromComponent(StatusSnackComponent, {
      duration: 2000,
      announcementMessage: 'Change status'
    });
  }

  public openPrioritySnack(notice: Notice) {
   this.snackBarRef = this.prioritySnack.openFromComponent(PrioritySnackComponent, {
      duration: 3000,
      announcementMessage: 'Change priority'
    });
    this.showPriority = false;
    console.log('id =' + notice.id);
    console.log('openPrioritySnack notice.priority =' + notice.priority);
    console.log('openPrioritySnack this.note.priority =' + this.priority);
    console.log('notice.status =' + notice.status);
    console.log('notice.showpriority =' + notice.showpriority);
    this._sharedService.publishData(notice);
    
      this.snackBarRef.afterDismissed()
    .subscribe(
      () => {console.log('this.note.priority ngOnDestroy!!!!'  + this.note.priority);
        this.showPriority = true;
        this.updateNewData(this.note);
      }
    );
    
    
  }

  private updateNewData(notice: Notice) {
        this._service.updateNotice(notice)
          .subscribe(
          () => this.refresh(),
          error => this.errorMessage = error
    );
  }
}
