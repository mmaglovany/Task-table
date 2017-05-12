import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Notice } from '../index';

@Injectable()
export class SharedService {

    // Observable string sources
  private caseNumber = new Subject<Notice>();

  // Observable Notice streams
  caseNumber$ = this.caseNumber.asObservable();

  private newData = new Subject<string>();

  // Observable Notice streams
  newData$ = this.caseNumber.asObservable();

    // Service message commands
  publishData(data: Notice) {
    this.caseNumber.next(data);
  }

  refresh() {
    this.newData.next('Data was update');
  }
}
