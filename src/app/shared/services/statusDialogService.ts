import { Observable, Subject } from 'rxjs/Rx';
import { StatusSnackComponent } from '../../status-snack/status-snack.component';
import { MdDialogRef, MdDialog } from '@angular/material';
import { Injectable } from '@angular/core';
import { Status } from '../index';


@Injectable()
export class StatusDialogService {

    private newStatus = new Subject<number>();
    newStatus$ = this.newStatus.asObservable();

    constructor(private dialog: MdDialog) { }

    public confirm(title: string, message: string): Observable<number> {

        let dialogRef: MdDialogRef<StatusSnackComponent>;

        dialogRef = this.dialog.open(StatusSnackComponent);

        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;
        return dialogRef.afterClosed();
    }
}
