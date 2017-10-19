import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Observable';

@Injectable()
export class GetCalendarServices {

  constructor() { }

  getCalendarByYear(year) {
    console.log(year);
  }

}
