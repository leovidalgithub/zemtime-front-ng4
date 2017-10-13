import { Component, OnInit } from '@angular/core';
import { TranslationService, iCalendars, MyServices } from '../../../../shared';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GetCalendarServices } from './calendar.services';
import { GetCalendarsServices } from './../calendars.services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';
declare var $: any;

@Component({
    selector: 'zem-calendar-selected',
    templateUrl: 'calendar.component.html',
    styleUrls: ['calendar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements OnInit {

    private myDates    = {};
    private currentYear: number            = new Date().getFullYear();
    private myCalendars: Array<iCalendars> = []; // Recive all calendars with interface iCalendar

    private calendarId;
    private calendarName;
    private allCalendars;

    // Form variables
    private rForm:             FormGroup;
    private nameNewCalendar:   string;
    private newCalendarType:   number;
    private calendarExists:    Boolean = false;
    private calendarCreatedOk: Boolean = false;

    constructor(
        private myTranslate:           TranslationService,
        private myServices:            MyServices,
        private myGetCalendarServices: GetCalendarServices,
        private myGetCalendarsService: GetCalendarsServices,
        private activatedRoute:        ActivatedRoute,
        private fb:                    FormBuilder
    ) {
      this.rForm = fb.group({
        'nameNewCalendar': [ null, Validators.compose([ Validators.required, Validators.minLength(2), Validators.maxLength(20) ]) ]
      });
    }

    ngOnInit() {
        this.myCalendars = this.myGetCalendarsService.getCalendars(); // Recive calendars data
        this.myDates = this.myGetCalendarServices.getCalendar(this.calendarId);
        // this.myDates = this.myGetCalendarServices.getCalendar('123');
        this.createMonths();
        this.createCalendars();

        this.allCalendars = this.myGetCalendarsService.getCalendars();

        // Get calendar id and Calendar name
        this.activatedRoute.params.subscribe((params: Params) => {
          this.calendarId = params['id'];

          this.allCalendars.forEach(element => {
            if (element.id === this.calendarId) {
              this.calendarName = element.name;
            }
          });
        });

    }

    // Create calendars inside each month
    createCalendars() {
        for (let month = 1; month < 13; month++) {

          $.datepicker.regional['es'] = {
            closeText: 'Cerrar',
            currentText: 'Hoy',
            monthNames: [
              'Enero',
              'Febrero',
              'Marzo',
              'Abril',
              'Mayo',
              'Junio',
              'Julio',
              'Agosto',
              'Septiembre',
              'Octubre',
              'Noviembre',
              'Diciembre'
            ],
            monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
            dayNames: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
            dayNamesShort: ['dom', 'lun', 'mar', 'mie', 'jue', 'vie', 'sab'],
            dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
            weekHeader: 'Sm',
          };

          $.datepicker.setDefaults($.datepicker.regional['es']);

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


    // Create 12 months to apply calendar
    createMonths() {
        $('#months div').remove();
        for (let i = 1; i < 13; i++) {
            $(`<div/>`, {
                id: `calendar-${i}`,
                class: `calendar`
            }).appendTo('#months');
        }
    }

    // Save a new calendar (rForm onSubmit)
    saveCalendar(calendar, currentCalendarType) {
      this.nameNewCalendar = this.myServices.capitalizeFirstLetter(calendar.nameNewCalendar); // New calendar name
      this.newCalendarType = currentCalendarType; // New calendar type

      // Check if new calendars name already exists in BBDD and show/notShow error message
      // tslint:disable-next-line:no-shadowed-variable
      this.myCalendars.forEach(calendar => {
        if (calendar.name.toLocaleLowerCase() === this.nameNewCalendar.toLocaleLowerCase()) {
          this.calendarExists = true;
        }
      });

      if (this.calendarExists) {
        setTimeout( () => {
          this.calendarExists = false;
        }, 1500);
      } else {
        this.calendarCreatedOk = true;
        setTimeout( () => {
          this.calendarCreatedOk = false;
          // this.rForm.reset();
        }, 2000);
      }
    }

}
