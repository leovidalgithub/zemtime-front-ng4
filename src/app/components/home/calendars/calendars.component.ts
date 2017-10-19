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
})
export class CalendarsComponent implements OnInit {
  // Calendar props
  private myCalendars: Array<iCalendars> = []; // Recive all calendars with interface iCalendar
  private currentType: eCalendarTypeShowed = 1; // Initialize in 'Country' by default
  private currentId: string;

  // Delete props
  private deleteConfirm: Boolean = false;

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
  ) {}

  ngOnInit() {
    this.getCalendars();
  }

  // Recive all calendars
  getCalendars() {
    this.myGetCalendarsServices.getCalendars().subscribe(
      (res: iCalendars[]) => {
        this.myCalendars = res;
      },
      err => {
        console.log('err', err);
      }
    );
  }

  createCalendar() {
    let newCalendar: object = {
      name: 'New calendar name',
      type: this.currentType
    };
  }

  // Delete calendar
  deleteCalendar() {
    console.log(this.currentId);
    this.deleteConfirm = false;
    this.currentId = null;
  }
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
