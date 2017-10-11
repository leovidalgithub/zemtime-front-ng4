import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, RouterLink } from '@angular/router';
import { TranslationService, iCalendars } from '../../../shared';
import { GetCalendarsServices } from './calendars.services';

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
    private myVar: any;

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
        private myGetCalendarsServices: GetCalendarsServices
    ) {}

    ngOnInit() {
        this.myCalendars = this.myGetCalendarsServices.getCalendars();
    }

    saveNewCalendar(newCalendarName, currentCalendarType) {
        // tslint:disable-next-line:curly
        if (!newCalendarName.trim()) {};
    }

    fn() {
        this.myGetCalendarsServices.searchCity()
            .subscribe(
                (res) => {
                    console.log(res[0].id);
                    this.myVar = res;
                });
    }

}
