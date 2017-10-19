import { Component, OnInit } from '@angular/core';
import { TranslationService, iCalendars, MyServices } from '../../../../shared';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GetCalendarServices } from './calendar.services';
import { GetCalendarsServices } from './../calendars.services';
import { GetCalendarLangService } from './calendar.translations.service';
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
  private currentYear: number = new Date().getFullYear();
  private prevYear:    number = this.currentYear - 1;
  private nextYear:    number = this.currentYear + 1;
  private myCalendars: Array<iCalendars> = []; // Recive all calendars with interface iCalendar

  public calendarId;
  public calendarName;
  public allCalendars;

  // Form variables
  private rForm:             FormGroup;
  private nameNewCalendar:   string;
  private newCalendarType:   number;
  private calendarExists:    Boolean = false;
  private calendarCreatedOk: Boolean = false;

  constructor(
    private myTranslate:           TranslationService,
    private translate:             TranslateService,
    private myServices:            MyServices,
    private myGetCalendarServices: GetCalendarServices,
    private myGetCalendarsService: GetCalendarsServices,
    private myGetCalendarLangService: GetCalendarLangService,
    private activatedRoute:        ActivatedRoute,
    private fb:                    FormBuilder
  ) {
    this.rForm = fb.group({
      'nameNewCalendar': [ null, Validators.compose([ Validators.required, Validators.minLength(2), Validators.maxLength(20) ]) ]
    });

    // Get calendar id and Calendar name
    this.allCalendars = this.myGetCalendarsService.getCalendars();
    this.activatedRoute.params.subscribe((params: Params) => {
      this.calendarId = params['id'];

      this.allCalendars.forEach(element => {
        if (element.id === this.calendarId) {
          this.calendarName = element.name;
        }
      });
    });
  }

  ngOnInit() {
    this.myCalendars = this.myGetCalendarsService.getCalendars(); // Recive calendars data
    this.myDates = this.myGetCalendarServices.getCalendar(this.calendarId);
    // this.myDates = this.myGetCalendarServices.getCalendar('123');

    // Select calendar language based in the current language and then create months and calendars
    $.datepicker.regional[this.translate.currentLang] = this.myGetCalendarLangService.getCalendarLang(this.translate.currentLang);
    $.datepicker.setDefaults($.datepicker.regional[this.translate.currentLang]);
    this.createMonths();
    this.createCalendars();
  }

  // Create calendars inside each month
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

  // getCalendarByYear(year) {
  //   return this.myGetCalendarServices.getCalendarByYear(year);
  // }

}
