import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core'; 
import { MdDialogRef } from '@angular/material';
import { Status, Icons } from '../shared';

@Component({
  selector: 'app-status-snack',
  templateUrl: './status-snack.component.html',
  styleUrls: ['./status-snack.component.css']
})
export class StatusSnackComponent implements OnInit {
  public title: string;
  icon = Icons;
  public message: string;
  public status: number;

  constructor(public dialogRef: MdDialogRef<StatusSnackComponent>) { }

  ngOnInit() {
  }

  public setStatus(numberStatus) {
    this.status = numberStatus;
  }
}
