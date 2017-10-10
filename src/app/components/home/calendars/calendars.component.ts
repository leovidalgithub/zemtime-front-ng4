import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, RouterLink } from '@angular/router';
import { TranslationService, iCalendars } from '../../../shared';
import { GetCalendarsService } from './calendars.services';

enum eCalendarTypeShowed {
    country = 1,
    state   = 2,
    city    = 3
}

@Component({
    selector: 'zem-calendars',
    templateUrl: './calendars.component.html',
    styleUrls: ['./calendars.component.scss']
})
export class CalendarsComponent implements OnInit {

    private myCalendars: Array<iCalendars>      = [];
    private newCalendarShowed: Boolean          = false;
    private typeViewShowed: eCalendarTypeShowed = 1; // initialize in 'Country' by default

    private headerData: object = {
        sectionData: {
            title: this.myTranslate.getTranslation('calendars.title'),
            titleClass: 'mdi mdi-calendar-range',
            notificationShow: false,
            spanShow: false
        },
        actionsShow: {
            showActions: false
        }
    };

    constructor(
        private myTranslate: TranslationService,
        private myGetCalendarsService: GetCalendarsService
    ) {}

    ngOnInit() {
        this.myCalendars = this.myGetCalendarsService.getCalendars();
    }

    saveNewCalendar(newCalendarName, currentCalendarType) {
        // tslint:disable-next-line:curly
        if (!newCalendarName.trim()) {};
    }

}
