import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { MyServices, iCalendars } from '../../../shared';

@Injectable()
export class CalendarsServices {
  constructor(private http: Http, private msUtils: MyServices) { }

  getCalendars(): Observable<CalendarClass[]> {
    return this.http.get(this.msUtils.buildURL('getCalendars'))
      .map(res => {
        return res.json().map(item => {
          return new CalendarClass(
            item._id,
            item.type,
            item.name,
            item.years
          );
        });
      });
  }

  createNewCalendar(newCalendarData): Observable<CalendarClass[]> {
    return this.http.post(this.msUtils.buildURL('createCalendar'), newCalendarData)
      .map(res => {
        return res.json().map(item => {
          return new CalendarClass(
            item._id,
            item.type,
            item.name,
            item.years
          );
        });
      });
  }

  deleteCalendar(calendarId): Observable<any> {
    return this.http.get(this.msUtils.buildURL('deleteCalendar') + calendarId);
  }

  updateCalendar(calendar): Observable<any> {
    return this.http.post(this.msUtils.buildURL('updateCalendar'), calendar);
  }

}

class CalendarClass implements iCalendars  {
  id: string;
  type: number;
  name: string;
  years: [
    {
      year: number;
      days: number[];
    }
  ];
  constructor(_id, _type, _name, _years) {
    this.id = _id;
    this.type = _type;
    this.name = _name;
    this.years = _years;
  }
}
