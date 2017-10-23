import { Component, OnInit } from '@angular/core';
import { TranslationService, iCalendars, MyServices } from '../../../shared';
import { CalendarsServices } from './calendars.services';
import { TranslateService } from '@ngx-translate/core';

declare var $: any; // Jquery


// Filter calendar types
enum eCalendarTypeShowed {
    country = 1,
    state = 2,
    city = 3,
    userCalendars = 4
}

@Component({
    selector: 'zem-calendars',
    templateUrl: './calendars.component.html',
    styleUrls: ['./calendars.component.scss']
})
export class CalendarsComponent implements OnInit {

    private myCalendars:   Array<iCalendars>   = []; // Recive all calendars with interface iCalendar
    private currentType:   eCalendarTypeShowed = 1; // Initialize in 'Country' by default
    private currentId:     string              = null; // Current calendar Id
    private deleteConfirm: Boolean             = false; // Show delete confirmation

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
        private myTranslate:         TranslationService,
        private myCalendarsServices: CalendarsServices,
        private myServices:          MyServices,
        private translate:           TranslateService
    ) { }

    ngOnInit() {
      // Select calendar language based in the current language and set default
      this.myCalendarsServices.getTranslationJSON(this.translate.currentLang)
          .subscribe( (value) => {
            $.datepicker.regional[this.translate.currentLang] = value;
            $.datepicker.setDefaults($.datepicker.regional[this.translate.currentLang]);
      });
      // Recive all calendars
      this.getCalendars();
    }

    // Recive all calendars
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

    // Delete full calendar by id
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

    // Create calendar
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
                    console.log('err', err);
                }
            );
        });
    }

}
