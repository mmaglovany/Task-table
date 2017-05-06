import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Notice } from './notice';

import { Observable } from 'rxjs/Observable';
//import 'rxjs/Rx';

@Injectable()
export class NoticeService {

  private url = 'http://localhost:2403/notices';

  constructor(private http: Http) { }

  public getNotices(): Observable<Notice[]> {
    const notices = this.http.get(this.url)
      .map(this.extractNotices)
      .catch(this.handleError);
    return notices;
  }

  public getNotice(id: string): Observable<Notice> {
    let notice = this.http.get(this.url + '/' + id)
      .map(this.extractNotice)
      .catch(this.handleError);
    return notice;
  }

  public addNotice(notice: Notice): Observable<Notice> {
    return this.http.post(this.url, notice)
      .catch(this.handleError);
  }

  public updateNotice(notice: Notice): Observable<Notice> {
    return this.http.put(this.url + '/' + notice.id, notice)
      .catch(this.handleError);
  }

  public deleteNotice(notice: Notice): Observable<Notice> {
    return this.http.delete(this.url + '/' + notice.id)
      .catch(this.handleError);
  }

  private extractNotices(response: Response) {
    let res = response.json();
    let notices: Notice[] = [];
    for (let i = 0; i < res.length; i++) {
      notices.push(new Notice(res[i].id, res[i].name, res[i].status, res[i].priority, res[i].showpriority));
    }
    return notices;
  }

  private extractNotice(response: Response) {
    let res = response.json();
    let notice: Notice = null;
    notice = new Notice(res.id, res.name, res.status, res.priority, res.showpriority);
    return notice;
  }

  private handleError(error: any, caught: Observable<any>): any {
    let message = '';

    if (error instanceof Response) {
      const errorData = error.json().error || JSON.stringify(error.json());
      message = `${error.status} - ${error.statusText || ''} ${errorData}`;
    } else {
      message = error.message ? error.message : error.toString();
    }
    console.error(message);
    return Observable.throw(message);
  }
}
