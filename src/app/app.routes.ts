import { Routes } from '@angular/router';
import { NoticeListComponent } from './notice-list/notice-list.component';
import { NoticeCreateEditComponent } from './notice-create-edit/notice-create-edit.component';
import { NoticeDeleteComponent } from './notice-delete/notice-delete.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'notices',
        pathMatch: 'full'
    },
    { path: 'notices', component: NoticeListComponent },
    { path: 'notices/edit/:id', component: NoticeCreateEditComponent },
    { path: 'notices/create', component: NoticeCreateEditComponent },
    { path: 'notices/delete/:id', component: NoticeDeleteComponent }
];
