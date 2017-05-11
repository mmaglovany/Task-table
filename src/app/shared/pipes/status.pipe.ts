import { Component, Pipe, PipeTransform } from '@angular/core';
import { Http } from '@angular/http';

@Pipe({ name: 'statusPipe' })
export class StatusPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            query = query.toLowerCase();
            return array.filter((value: any, index: number, arr: any) =>
                value.status.toLowerCase().indexOf(query) > -1);
        }
        return array;
    }
}
