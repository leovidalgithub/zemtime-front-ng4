import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Observable';

@Injectable()
export class GetCalendarServices {

  constructor() { }

  getCalendar(id): object {
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

}
