import { Component, OnInit } from '@angular/core';
import { TranslationService } from '../../../../shared';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GetCalendarServices } from './calendar.services';
import { ViewEncapsulation } from '@angular/core';
declare var $: any;

@Component({
    selector: 'zem-calendar-selected',
    templateUrl: 'calendar.component.html',
    styleUrls: ['calendar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements OnInit {

    private myDates = {};
    private currentYear: number = new Date().getFullYear();

    constructor(
        // private myTranslate: TranslationService,
        private myGetCalendarServices: GetCalendarServices,
        // private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        this.myDates = this.myGetCalendarServices.getCalendar('123');
        console.log(this.myDates);
        this.createMonths();
        this.createCalendars();
    }
    // this.myTranslate.getTranslation('dashboard.title')

    createCalendars() {
        for (let month = 1; month < 13; month++) {
            $(`#calendar-${month}`).datepicker({
                changeYear: false,
                changeMonth: false,
                stepMonths: 0,
                defaultDate: new Date(month + '/01/' + this.currentYear),
                showMonthAfterYear: false,
                firstDay: 1,
                inline: true,
                onSelect: (date, inst) => {
                    let thisDate = new Date(date).getTime();
                    if (this.myDates[thisDate]) {
                        delete this.myDates[thisDate];
                    } else {
                        this.myDates[thisDate] = {};
                        this.myDates[thisDate].type = 'holiday';
                    }
                    this.createCalendars();
                },
                beforeShowDay: (date) => {
                    date = new Date(date).getTime();
                    if (this.myDates[date]) {
                        return [true, 'eventDay', 'eventDay'];
                    } else {
                        return [true, '', 'holiday'];
                    }
                }
            });
        }
    }

    createMonths() {
        $('#months div').remove();
        for (let i = 1; i < 13; i++) {
            $(`<div/>`, {
                id: `calendar-${i}`,
                class: `calendar`
            }).appendTo('#months');
        }
    }

}
