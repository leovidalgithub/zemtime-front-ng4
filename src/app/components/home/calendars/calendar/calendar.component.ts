import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { TranslationService, iCalendars, MyServices } from '../../../../shared';
import { TranslateService } from '@ngx-translate/core';
// import { Router, ActivatedRoute, Params } from '@angular/router';
// import { GetCalendarServices } from './calendar.services';
// import { GetCalendarsServices } from './../calendars.services';
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
export class CalendarComponent implements OnInit, OnChanges {

  @Input('currentId') currentId:     string;
  @Input('calendarType') calendarType: number;
  @Input('myCalendars') myCalendars: Array<iCalendars>;

  private years = [
    new Date().getFullYear() - 1,
    new Date().getFullYear(),
    new Date().getFullYear() + 1
  ];

  private yearSelected: number = this.years[1];

  // Form variables
  private rForm:             FormGroup;
  private calendarCreatedOk: Boolean = false;

  private myCalendar: object;
  private myDates: Array<number>;

  constructor(
      private myTranslate:           TranslationService,
      private translate:             TranslateService,
      private myServices:            MyServices,
      private myGetCalendarLangService: GetCalendarLangService,
      private fb:                    FormBuilder
  ) {
    this.rForm = fb.group({
      'nameNewCalendar': [ null, Validators.compose([ Validators.required, Validators.minLength(2), Validators.maxLength(21) ]) ]
    });
  }

  ngOnInit() {
      // Select calendar language based in the current language and then create months and calendars
      $.datepicker.regional[this.translate.currentLang] = this.myGetCalendarLangService.getCalendarLang(this.translate.currentLang);
      $.datepicker.setDefaults($.datepicker.regional[this.translate.currentLang]);
  }

  ngOnChanges(changes: SimpleChanges) {
    if ( changes.currentId.currentValue ) {
      this.refresh();
    }
  }

  refresh() {
    this.myCalendar = this.myCalendars.filter( calendar => calendar.id === this.currentId );

    // If there is a calendar with this year create myDates and turn true variable
    if (this.myCalendar[0].years.some( years => years.year === this.yearSelected )) {
      this.myDates = this.myCalendar[0].years.find( years => years.year === this.yearSelected ).days;
    } else {
      this.myDates = [];
    }
    this.createMonths();
    this.createCalendars(this.myDates);
  }

  amIExist(year): boolean {
    return this.myCalendar[0].years.some( years => years.year === year );
  }

  // Create calendars inside each month
  createCalendars(myDates) {
      for (let month = 1; month < 13; month++) {

        $(`#calendar-${month}`).datepicker({
            changeYear: false,
            changeMonth: false,
            stepMonths: 0,
            defaultDate: new Date(month + '/01/' + this.yearSelected),
            showMonthAfterYear: false,
            firstDay: 1,
            inline: true,
            onSelect: (date, inst) => {
                let thisDate = new Date(date).getTime();
                let dateIndex = myDates.indexOf(thisDate);
                if (  dateIndex !== -1 ) {
                  myDates.splice(dateIndex, 1);
                } else {
                  myDates.push(thisDate);
                }
                this.createCalendars(myDates);
                console.log(myDates);
            },
            beforeShowDay: (date) => {
                date = new Date(date).getTime();
                if ( myDates.indexOf(date) !== -1 ) {
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
  saveCalendar(calendarName) {
    // if form is correct
    if ( this.rForm.valid ) {
      this.myCalendar[0].name = this.myServices.capitalizeFirstLetter(calendarName);
      console.log('currentType: ' + this.calendarType);
      console.log('CalendarName: ' + this.myServices.capitalizeFirstLetter(calendarName));
      console.log( this.myCalendar );
    } else {
      console.log('not correct');
    }

    // // this.nameNewCalendar = this.myServices.capitalizeFirstLetter(calendar.nameNewCalendar); // New calendar name
    // this.newcurrentType = currentcurrentType; // New calendar type

    // Check if new calendars name already exists in BBDD and show/notShow error message
    // tslint:disable-next-line:no-shadowed-variable
    // this.myCalendars.forEach(calendar => {
    //   if (calendar.name.toLocaleLowerCase() === this.nameNewCalendar.toLocaleLowerCase()) {
    //     this.calendarExists = true;
    //   }
    // });

    // if (this.calendarExists) {
    //   setTimeout( () => {
    //     this.calendarExists = false;
    //   }, 1500);
    // } else {
    //   this.calendarCreatedOk = true;
    //   setTimeout( () => {
    //     this.calendarCreatedOk = false;
    //     // this.rForm.reset();
    //   }, 2000);
    // }

    // console.log(currentcurrentType);

  }

  // getCalendarByYear(year) {
  //   return this.myGetCalendarServices.getCalendarByYear(year);
  // }

}
