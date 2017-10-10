import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, RouterLink } from '@angular/router';
import { TranslationService } from '../../../shared';
import { GetCalendarsService } from './getCalendars.service';

@Component({
    selector: 'zem-calendars',
    templateUrl: './calendars.component.html',
    styleUrls: ['./calendars.component.scss']
})
export class CalendarsComponent implements OnInit {

    private myCalendars: object[] = [];

    // Calendars first filter
    private countryShow: Boolean = true;
    private countryArray: Array<string>;

    private comShow: Boolean = false;
    private comArray: Array<string>;

    private cityShow: Boolean = false;
    private cityArray: Array<string>;

    // Show country on load
    private typeView = 'countryShow';

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

    constructor(private myTranslate: TranslationService,
        private myGetCalendarsService: GetCalendarsService
    ) {}

    ngOnInit() {
        this.myCalendars = this.myGetCalendarsService.getCalendars();
        console.log(this.myCalendars[0]);

        // let keys = Object.keys(this.myCalendars);
        // console.log(keys);

        //  this.getCountries();
    }

    getCountries() {}


}
