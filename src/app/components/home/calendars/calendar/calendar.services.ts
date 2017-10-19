import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
//import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'


@Injectable()
export class GetCalendarServices {

  constructor(private http: Http) {}
  // getCalendar(id): Observable<string> {
  // return this.translate.get(value)
  // .map(thisValue => thisValue.toUpperCase());
  // }
  getCalendar(id): object {
    console.log(id);
    let myDates: object = {};
    for (let i = 1; i < 20; i++) {
      let dayNumber = Math.floor((Math.random() * 30) + 1);
      let longDate = new Date(2017, 0, dayNumber);
      let newDate = longDate.getTime();
      if (!myDates[newDate]) {
        myDates[newDate] = {};
        myDates[newDate].type = 'holiday';
        myDates[newDate].long = longDate;
      }
    }
    return myDates;
  }

   getTranslationJSON(lang){
      return this.http.get(`../../../public/localeCalendar/translationsCalendar/${lang}.json`)
        .map( (response: Response) => {
          console.log(response.json());
          return response.json();
        });
    }
}
