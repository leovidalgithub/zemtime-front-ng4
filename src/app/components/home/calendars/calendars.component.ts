import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, RouterLink } from '@angular/router';
import { TranslationService, iCalendars, MyServices } from '../../../shared';
import { GetCalendarsServices } from './calendars.services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // delete?

// Filter calendar types
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

    private myCalendars:         Array<iCalendars>   = []; // Recive all calendars with interface iCalendar
    private newCalendarShowed:   Boolean             = false;
    private typeViewShowed:      eCalendarTypeShowed = 1; // Initialize in 'Country' by default
    private createCalendarShow:  Boolean             = false; //
    private calendarName:        string;

    // Form variables
    private rForm:             FormGroup;
    private nameNewCalendar:   string;
    private newCalendarType:   number;
    private calendarExists:    Boolean = false;
    private calendarCreatedOk: Boolean = false;

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
        private myGetCalendarsService: GetCalendarsServices,
        private fb: FormBuilder
    ) {
        this.rForm = fb.group({
            'nameNewCalendar': [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(20)])]
        });
    }

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

    // createShow() {
    //   this.createCalendarShow = !this.createCalendarShow;

    //   if (this.createCalendarShow) {
    //     setTimeout( () => {
    //       this.rForm.reset();
    //     }, 1);
    //   }
    // }

    // Close form when new calendar is saved and hide the form. It also checks if the new calendars name already exists in BBDD
    savedCalendar() {
      this.myCalendars.forEach((calendar, i) => {
        if (calendar.name.toLocaleLowerCase() !== this.nameNewCalendar.toLocaleLowerCase() && calendar.type === this.newCalendarType) {
          setTimeout( () => {
            this.createCalendarShow = false;
          }, 600);
        }
      });
    }


}
