import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, RouterLink } from '@angular/router';
import { TranslationService, iCalendars } from '../../../shared';
import { GetCalendarsService } from './getCalendars.service';

@Component({
    selector: 'zem-calendars',
    templateUrl: './calendars.component.html',
    styleUrls: ['./calendars.component.scss']
})
export class CalendarsComponent implements OnInit {

    private myCalendars: Array<iCalendars> = [];

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
            title: this.myTranslate.getTranslation('dashboard.title'),
            titleClass: 'mdi mdi-bell-outline',
            notificationShow: true,
            notificationCondition: '1',
            notificationResult: '4',
            span: this.myTranslate.getTranslation('calendars.calendar'),
            spanName: ' Barcelona',
            spanShow: true
        },
        actionsShow: {
            showActions: true
        },
        actionButtons: [
            {
                text: this.myTranslate.getTranslation('general.buttons.ok'),
                buttonClass: 'bt-act',
                title: false,
                show: true,
                clickAction: function () {
                    alert('clicar el botón 1');
                }
                // clickParameters: '',
            }, {
                text: this.myTranslate.getTranslation('general.buttons.cancel'),
                buttonClass: 'bt-pos',
                title: false,
                show: true,
                clickAction: function () {
                    alert('clicar el botón 2');
                },
                // clickParameters: '',
            }
        ]
    };

    constructor(private myTranslate: TranslationService,
        private myGetCalendarsService: GetCalendarsService
    ) {}

    ngOnInit() {
        this.myCalendars = this.myGetCalendarsService.getCalendars();
    }

}
