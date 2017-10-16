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
        private myTranslate:           TranslationService,
        private myGetCalendarsServices: GetCalendarsServices,
        private myServices:            MyServices,
        private myGetCalendarsService: GetCalendarsServices,
        private fb:                    FormBuilder,
    ) {

      this.rForm = fb.group({
        'nameNewCalendar': [ null, Validators.compose([ Validators.required, Validators.minLength(2), Validators.maxLength(20) ]) ]
      });

    }

    ngOnInit() {
      this.getCalendars();
    }

    // createShow() {
    //   this.createCalendarShow = !this.createCalendarShow;

    //   if (this.createCalendarShow) {
    //     setTimeout( () => {
    //       this.rForm.reset();
    //     }, 1);
    //   }
    // }

    // // Save a new calendar (rForm onSubmit)
    // saveCalendar(calendar, currentCalendarType) {
    //   this.nameNewCalendar = this.myServices.capitalizeFirstLetter(calendar.nameNewCalendar); // New calendar name
    //   this.newCalendarType = currentCalendarType; // New calendar type

    //   // Check if new calendars name already exists in BBDD and show/notShow error message
    //   // tslint:disable-next-line:no-shadowed-variable
    //   this.myCalendars.forEach(calendar => {
    //     if (calendar.name.toLocaleLowerCase() === this.nameNewCalendar.toLocaleLowerCase()) {
    //       this.calendarExists = true;
    //     }
    //   });

    //   if (this.calendarExists) {
    //     setTimeout( () => {
    //       this.calendarExists = false;
    //     }, 1500);
    //   } else {
    //     this.calendarCreatedOk = true;
    //     setTimeout( () => {
    //       this.createCalendarShow = false; // check if saved OK
    //       this.calendarCreatedOk = false;
    //       this.rForm.reset();
    //     }, 2000);
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

}


// **************************************************************************************************************************************
      // Check if new calendars name already exists in BBDD and show/notShow error message
      // tslint:disable-next-line:no-shadowed-variable
      // this.myCalendars.forEach(calendar => {
      //   if (calendar.name.toLocaleLowerCase() === this.nameNewCalendar.toLocaleLowerCase() && calendar.type === this.newCalendarType) {
      //     this.calendarExists = true;
      //     setTimeout( () => {
      //       this.calendarExists = false;
      //     }, 2000);
      //     console.log(calendar.name);
      //   } else if (calendar.name.toLocaleLowerCase() !== this.nameNewCalendar.toLocaleLowerCase() && calendar.type === this.newCalendarType && !this.calendarExists) {
      //     this.calendarCreatedOk = true;
      //     setTimeout( () => {
      //       this.createCalendarShow = false; // check if saved OK
      //       this.calendarCreatedOk = false;
      //       this.rForm.reset();
      //     }, 2000);
      //     console.log(this.nameNewCalendar, this.newCalendarType);
      //   }
      // });
// **************************************************************************************************************************************
