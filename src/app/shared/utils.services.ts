import { Injectable } from '@angular/core';

const SERVER_PORT = process.env.SERVER_PORT || 5005;
const PROTOCOL    = window.location.protocol;
const HOSTNAME    = window.location.hostname;
let API_base = `${PROTOCOL}//${HOSTNAME}:${SERVER_PORT}/`;
let API_paths = {
    getCalendars: 'calendars/calendars',
    createCalendar: 'calendars/createCalendar/'
};

@Injectable()
export class MyServices {
    // please, comment what do I do?
    public buildURL = (path) => {
        'use strict';
        return API_base + API_paths[path];
    }

    // Capitalize first letter
    public capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
}
