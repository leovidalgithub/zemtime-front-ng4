import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, RouterLink } from '@angular/router';
import { TranslationService, iCalendars } from '../../../shared';
import { GetCalendarsService } from './calendars.services';

@Component({
    selector: 'zem-calendars',
    templateUrl: './calendars.component.html',
    styleUrls: ['./calendars.component.scss']
})
export class CalendarsComponent implements OnInit {

    private myCalendars: Array<iCalendars> = [];

    // Calendars first filter
    private myTypeFilterObject: object = {
      countryShow: true,
      stateShow: false,
      cityShow: false
    };

    // Create calendar div
    private createCalendarShow = false;

    private typeView: any = 'myTypeFilterObject.countryShow'; // Show country on load

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
    ) {
      // this.typeView = 'myTypeFilterObject.countryShow';
    }

    ngOnInit() {
        this.myCalendars = this.myGetCalendarsService.getCalendars();
    }

    viewNewCalendar() {
      this.createCalendarShow = !this.createCalendarShow;
    }
    saveNewCalendar(name, type) {
      console.log('Name: ' + name);
      console.log('Type: ' + type);
    }

}
