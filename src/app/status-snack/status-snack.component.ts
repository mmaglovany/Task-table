import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core'; 
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-status-snack',
  templateUrl: './status-snack.component.html',
  styleUrls: ['./status-snack.component.css']
})
export class StatusSnackComponent implements OnInit {
  public title: string;
  public message: string;
  public status: number;
  constructor(public dialogRef: MdDialogRef<StatusSnackComponent>) { }
  
  ngOnInit() {
  }

  public setStatus(numberStatus) {
    this.status = numberStatus;
  }
}
