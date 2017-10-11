import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { iCalendars } from '../../../shared';
import { Http, Response } from '@angular/http';
import { buildURL } from '../../../shared';

@Injectable()
export class GetCalendarsServices {
  constructor(private http: Http) {}

  searchCity(): Observable<CalendarClass> {
    return this.http.get(buildURL('testing'))
      .map( res => {
        return res.json().map(item => {
          return new CalendarClass(
            item._id,
            item.type,
            item.name,
            item.days
          );
        });
      });
  }

  getCalendars(): Array<iCalendars> {
    return [
      {
        name: 'España',
        id: '123',
        type: 1 // country
      },
      {
        name: 'USA',
        id: '456',
        type: 1 // country
      },
      {
        name: 'Colombia',
        id: '789',
        type: 1 // country
      },
      {
        name: 'Perú',
        id: '550',
        type: 1 // country
      },
      {
        name: 'Cataluña',
        id: '1232',
        type: 2 // state
      },
      {
        name: 'País Vasco',
        id: '98867',
        type: 2 // state
      },
      {
        name: 'Madrid',
        id: '098654',
        type: 2 // state
      },
      {
        name: 'Andulacía',
        id: '9543531',
        type: 2 // state
      },
      {
        name: 'Barcelona',
        id: '00542',
        type: 3 // city
      },
      {
        name: 'Bilbao',
        id: '17865',
        type: 3 // city
      },
      {
        name: 'Madrid',
        id: '24377',
        type: 3 // city
      },
      {
        name: 'Sevilla',
        id: '983221',
        type: 3 // city
      },
    ];
  };

}

class CalendarClass {
  private id: number;
  private type: number;
  private name: string;
  private days: number[];
  constructor(_id, _type, _name, _days) {
    this.id = _id;
    this.type = _type;
    this.name = _name;
    this.days = _days;
}

}
