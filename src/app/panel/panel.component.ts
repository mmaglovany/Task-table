import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html'
})
export class PanelComponent implements OnInit {

  constructor(
    private _router: Router,
  ) { }

  ngOnInit() {
  }

  private goGeneralPage() {
    this._router.navigate(['notices']);
  }

  private goAddPage() {
    this._router.navigate(['notices', 'create']);
  }
}
