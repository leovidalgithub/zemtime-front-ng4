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
