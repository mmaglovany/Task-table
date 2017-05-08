import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Notice, NoticeService } from '../shared/index';
import { MaterialModule, MdSnackBarRef, MdDialog } from '@angular/material';
import { DataTableModule } from 'angular2-datatable';
import { MdSnackBar } from '@angular/material';
import { StatusSnackComponent } from '../status-snack/status-snack.component';
import { PrioritySnackComponent } from '../priority-snack/priority-snack.component';
import { SharedService } from '../shared-service.service';
import { StatusDialogService } from '../shared/services/statusDialogService';
import { Status, Icons } from '../shared';


@Component({
  selector: 'app-notice-list',
  templateUrl: './notice-list.component.html',
  styleUrls: ['./notice-list.component.css']
})
export class NoticeListComponent implements OnInit {
  private snackBarRef: MdSnackBarRef<any>;
  private disableButton: boolean;
  private isBlur: boolean;
  private choiseStatus = false;
  private disableSave = true;
  private idItemSelected: string;
  private different = 0 ; 
  notices: Notice[];
  note: Notice;
  errorMessage: string;
  showPriority = true;
  priority: number;
  private statusSnackComponent: StatusSnackComponent;
  constructor(
    private _service: NoticeService,
    private _router: Router,
    private _snackBar: MdSnackBar,
    private _sharedService: SharedService,
    public statusSnack: MdSnackBar,
    public prioritySnack: MdSnackBar,
    public mdDialog: MdDialog,
    private _statusDialog: StatusDialogService
  ) {
    // this._sharedService.caseNumber$.subscribe(
    //   data => {
    //     console.log('NoticeListComponent-received from prioritySnack: ' + data.priority);
    //     this.note = data;
    //     if (this.note) {
    //       this.priority = data.priority;
    this._sharedService.newData$.subscribe(
      data => {
        console.log( data );
        this.getNotices();
         });
  }

  ngOnInit() {
    this.disableButton = true;
    this.getNotices();
  }

  // public refresh() {
  //   this.getNotices();
  // }

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

  private getNotificationRefresh(field: string) {
    let message = `The DB was updated with the new ${field} ! `;
     this._snackBar.open(message, '', {
      duration: 2000,
    }); 
  }

  public openStatusChoise(notice: Notice) {
    if (this.isBlur && this.idItemSelected !== notice.id && this.different !== 0) {
        this.note.showpriority = true;
        this.updateNewData(this.note, 'priority');
        this.idItemSelected = notice.id;
        console.log('saving to DB!!!');
        this.isBlur = true;
        this.different = 0;
    } else {
      this._statusDialog
      .confirm('Confirm Status', 'Choise a new status for the note!')
      .subscribe(res => {
        if (res) {
          notice.status =  Status[res];
          this.updateNewData(notice, 'status');
        }
        
      });
    }
    
  }

  public convertStatusToIcon(status: string) {
    return Icons[Status[status]];
  }
 
  public startChangePriority(notice: Notice) {
   
   if (this.isBlur && this.idItemSelected !== notice.id && this.different !== 0) {
     this.note.showpriority = true;
     this.updateNewData(this.note, 'priority');
      this.idItemSelected = notice.id;
      console.log('saving to DB!!!');
      this.isBlur = true;
      this.different = 0;
   }
    notice.showpriority = false;
    this.idItemSelected = notice.id;
    //this.priority = notice.priority;
  }

  public changePriority(item: number, notice: Notice) {
     
      this.different  = +this.different + item;
      console.log('this.different=' + this.different);
      //this.isBlur = false;
      //this.showPriority = true;
      if (this.different !== 0) {
        this.disableSave = false;
      } else {
        this.disableSave = true;
      }
         notice.showpriority = true;
  
    this.showPriority = false;
    
    // console.log('notice.priority=' + notice.priority);
    // console.log('item =' + item);
    notice.priority = notice.priority + item;
    this.priority = notice.priority;
    //console.log('notice.priority + item =' + notice.priority);
    //this._sharedService.publishData(this.notice);

  }

  private saveNotices() {
    this.disableSave = true;
  }

  public saveChangePriority(notice: Notice) {
     this.note = notice;
       
          this.isBlur = true;
         console.log('blur work!  '); 
      
     
      // this.showPriority = true;
     
 

  }
  public openPrioritySnack(notice: Notice) {
    // this.snackBarRef = this.prioritySnack.openFromComponent(PrioritySnackComponent, {
    //   duration: 3000,
    //   announcementMessage: 'Change priority'
    // });
    // this.showPriority = false;
    // console.log('id =' + notice.id);
    // console.log('openPrioritySnack notice.priority =' + notice.priority);
    // console.log('openPrioritySnack this.note.priority =' + this.priority);
    // console.log('notice.status =' + notice.status);
    // console.log('notice.showpriority =' + notice.showpriority);
    // this._sharedService.publishData(notice);

    // this.snackBarRef.afterDismissed()
    //   .subscribe(
    //   () => {
    //     console.log('this.note.priority ngOnDestroy!!!!' + this.note.priority);
    //     this.showPriority = true;
    //     this.updateNewData(this.note);
    //   }
    //   );


  }

  private updateNewData(notice: Notice, field: string) {
      this._service.updateNotice(notice)
                  .subscribe(
                  () => this.getNotificationRefresh(field),
                  error => this.errorMessage = error
               
    );
    
  }
}
