import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { MyServices, iCalendars } from '../../../shared';

@Injectable()
export class GetCalendarsServices {
  constructor(private http: Http, private ms: MyServices) { }

  getCalendars(): Observable<CalendarClass[]> {
    return this.http.get(this.ms.buildURL('getCalendars'))
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
