import { Component, Pipe, PipeTransform } from '@angular/core';
import { Http } from '@angular/http';

@Pipe({ name: 'namePipe' })
export class NamePipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            query = query.toLowerCase();
            return array.filter((value: any, index: number, arr: any) =>
                value.name.toLowerCase().indexOf(query) > -1);
        }
        return array;
    }
}
