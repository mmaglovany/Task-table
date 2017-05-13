import { Component, Pipe, PipeTransform } from '@angular/core';
import { Http } from '@angular/http';

@Pipe({ name: 'namePipe' })
export class NamePipe implements PipeTransform {
    transform(array: string[], query: string): string[] {
        if (query) {
            query = query.toLowerCase();
            return array.filter((value: any, index: number, arr: any) =>
                value.name.toLowerCase().indexOf(query) > -1);
        }
        return array;
    }
}
