import { Component, OnInit } from '@angular/core';
import { TranslationService, iCalendars, MyServices } from '../../../shared';
import { CalendarsServices } from './calendars.services';

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
    private deleteConfirm: Boolean = false;

    // HEADER DATA
    // tslint:disable-next-line:no-unused-variable
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
        private myCalendarsServices: CalendarsServices,
        private myServices: MyServices,
    ) { }

    ngOnInit() {
        this.getCalendars();
    }

    getCalendars() {
        this.myCalendarsServices.getCalendars()
            .subscribe(
            (res: iCalendars[]) => {
                this.myCalendars = res;
            },
            (err) => {
                console.log('err', err);
            }
            );
    }

    deleteCalendar() {
        this.myCalendarsServices.deleteCalendar(this.currentId)
            .subscribe(
            (res) => {
                let indexToRemove = this.myCalendars.findIndex((elm) => elm.id === this.currentId);
                this.myCalendars.splice(indexToRemove, 1);
                this.deleteConfirm = false;
                this.currentId = null;
            },
            (err) => {
                alert('error while deleting calendar');
            }
        );
    }

    createCalendar() {
        this.currentId = null;
        this.myTranslate.getTranslation('calendars.newCalendarName').subscribe(newDefaultName => {
            let newCalendarData: object = {
                name: newDefaultName,
                type: this.currentType,
                year: new Date().getFullYear()
            };
            this.myCalendarsServices.createNewCalendar(newCalendarData)
            .subscribe(
                (res: iCalendars[]) => {
                    this.myCalendars.push(res[0]);
                    this.currentId = res[0].id;
                },
                (err) => {
                    alert('error creating a new calendar');
                    console.log('err', err);
                }
            );
        });
    }

}
