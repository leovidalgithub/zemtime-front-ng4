import { Component, OnInit } from '@angular/core';
import { TranslationService, iCalendars, MyServices } from '../../../shared';
import { GetCalendarsServices } from './calendars.services';

// Filter calendar types
enum eCalendarTypeShowed {
    country = 1,
    state = 2,
    city = 3
}

@Component({
    selector: 'zem-calendars',
    templateUrl: './calendars.component.html',
    styleUrls: ['./calendars.component.scss']
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarsComponent implements OnInit {

    private myCalendars: Array<iCalendars> = []; // Recive all calendars with interface iCalendar
    private currentType: eCalendarTypeShowed = 1; // Initialize in 'Country' by default
    private currentId: string = null;

    // Header data
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
        private myGetCalendarsServices: GetCalendarsServices,
        private myServices: MyServices,
        private myGetCalendarsService: GetCalendarsServices
    ) { }

    ngOnInit() {
        this.getCalendars();
    }

    getCalendars() {
        this.myGetCalendarsServices.getCalendars()
            .subscribe(
            (res: iCalendars[]) => {
                this.myCalendars = res;
            },
            (err) => {
                console.log('err', err);
            }
            );
    }

    createCalendar() {
        this.myTranslate.getTranslation('calendars.newCalendarName').subscribe(newDefaultName => {
            let newCalendarData: object = {
                name: newDefaultName,
                type: this.currentType,
                year: new Date().getFullYear()
            };
            this.myGetCalendarsServices.createNewCalendar(newCalendarData)
                .subscribe(
                (res: iCalendars[]) => {
                    this.myCalendars.push(res[0]);
                    this.currentId = res[0].id;
                },
                (err) => {
                    console.log('err', err);
                }
                );
        });
    }

}
