import { MdSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class NotificationDbService {

    constructor(private _snackBar: MdSnackBar) { }

    public callBar(field: string) {
        this._snackBar.open(field, '', {
            duration: 3000,
        });
    }
}
