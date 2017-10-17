import { Pipe, PipeTransform } from '@angular/core';
import { iCalendars } from '../../../shared';

@Pipe({
    name: 'myCalendarsTypesPipe'
})
export class CalendarsTypesPipe implements PipeTransform {
    transform(items: Array<iCalendars>, myType: number): Array<iCalendars> {
        return items.filter(item => item.type === myType);
    }
}

@Pipe({
  name: 'myCalendarsNamePipe'
})
export class CalendarsNamePipe implements PipeTransform {
  transform(items: Array<iCalendars>, currentId: string): string {
      return items.find(item => item.id === currentId).name;
  }
}
