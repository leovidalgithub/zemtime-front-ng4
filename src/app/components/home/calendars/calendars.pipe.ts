import { Pipe, PipeTransform } from '@angular/core';
import { iCalendars } from '../../../shared';

@Pipe({
    name: 'myCalendarsTypesPipe',
    pure: false // declare a pipe to be stateful
  })
  export class CalendarsTypesPipe implements PipeTransform {
    transform(items: Array<iCalendars>, myType: number): Array<iCalendars> {
      return items.filter(item => item.type === myType);
    }
  }

@Pipe({
    name: 'myCalendarsNamePipe',
    pure: false // declare a pipe to be stateful
})
export class CalendarsNamePipe implements PipeTransform {
  transform(items: Array<iCalendars>, currentId: string): string {
      return items.find(item => item.id === currentId).name;
  }
}

@Pipe({
  name: 'myCapitalizeFirst'
})
export class CapitalizeFirstPipe implements PipeTransform {
    transform(value: any) {
        if (value) {
            return value.charAt(0).toUpperCase() + value.slice(1);
        }
        return value;
    }
}
