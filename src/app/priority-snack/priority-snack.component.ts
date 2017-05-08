import { Component, OnInit } from '@angular/core'; 
import { SharedService } from '../shared-service.service';
import { Notice } from '../shared/notice';

@Component({
  selector: 'app-priority-snack',
  templateUrl: './priority-snack.component.html',
  styleUrls: ['./priority-snack.component.css']
})
export class PrioritySnackComponent implements OnInit { 
  notice: Notice;
  priority = 0;
  constructor(private _sharedService: SharedService) {
    this._sharedService.caseNumber$.subscribe(
            data => {
                console.log('PrioritySnackComponent-received from notice: ' + data.priority);
                this.notice = data;
                console.log('this.notice.priority' + this.notice.priority);
            });
   }

  ngOnInit() {
  }

  public changePriority(item: number) {
    if (this.priority >= 0) {
      this.notice.priority = +this.notice.priority + item;
      this._sharedService.publishData(this.notice);
    }
  }

  public refresh () {
    this._sharedService.refresh();
  }

}
