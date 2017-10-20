import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { TranslationService, iCalendars, MyServices } from '../../../../shared';
import { TranslateService } from '@ngx-translate/core';
import { CalendarLangService } from './calendar.translations.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';
import { CalendarsServices } from '../calendars.services';

declare var $: any; // Jquery

@Component({
    selector: 'zem-calendar-selected',
    templateUrl: 'calendar.component.html',
    styleUrls: ['calendar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements OnInit, OnChanges {

  @Input('currentId') currentId:     string;
  @Input('currentType') currentType: number;
  @Input('myCalendars') myCalendars: Array<iCalendars>;

  private years = [
    new Date().getFullYear() - 1,
    new Date().getFullYear(),
    new Date().getFullYear() + 1
  ];

  // Form props
  private rForm:             FormGroup; // Input calendar title
  private calendarCreatedOk: Boolean = false; // Positive msg
  private holidays:          number; // Vacation counter

  // Calendar props
  private myCalendar:   iCalendars; // Selected calendar. Uses iCalendar interface
  private myDates:      Array<number>; // Array containing vacation dates
  private yearSelected: number = this.years[1]; // Onload always year selected is current year
  private checkTitle:   string; // Title for selecting vacation dates
  private uncheckTitle: string; // Title for diselecting vacation dates

  constructor(
      private myTranslate:           TranslationService,
      private translate:             TranslateService,
      private myServices:            MyServices,
      private fb:                    FormBuilder,
      private myCalendarLangService: CalendarLangService,
      private myCalendarsServices:   CalendarsServices
  ) {
    // Input calendar title
    this.rForm = fb.group({
      'nameNewCalendar': [ null, Validators.compose([ Validators.required, Validators.minLength(2), Validators.maxLength(21) ]) ]
    });

    // Translations for check uncheck holidays titles
    myTranslate.getTranslation('calendars.checkDay').subscribe(
      (value) => { this.checkTitle = value; }
    );
    myTranslate.getTranslation('calendars.uncheckDay').subscribe(
      (value) => { this.uncheckTitle = value; }
    );
  }

  ngOnInit() {
      // Select calendar language based in the current language and then create months and calendars
      $.datepicker.regional[this.translate.currentLang] = this.myCalendarLangService.getCalendarLang(this.translate.currentLang);
      $.datepicker.setDefaults($.datepicker.regional[this.translate.currentLang]);
  }

  ngOnChanges(changes: SimpleChanges) {
    // Check always if there is a change with the current id
    if ( changes.currentId.currentValue ) {
      this.refresh();
    }
  }

  refresh() {
    // Get current calendar object by id
    this.myCalendar = this.myCalendars.find( calendar => calendar.id === this.currentId );
    // If there is a calendar with this year create myDates and turn true variable
    if (!this.myCalendar.years.some( years => years.year === this.yearSelected )) {
      let newYear = {
        'year': this.yearSelected,
        'days': []
      };
      this.myCalendar.years.push(newYear);
      this.updateCalendar();
    }
    // Get all checked dates and then create months with calendar
    this.myDates = this.myCalendar.years.find( years => years.year === this.yearSelected ).days;
    this.createMonths();
    this.createCalendars(this.myDates);
    // Get number of holiday dates, used in the counter
    this.holidays = this.myDates.length;
  }

  // Check if calendar exists and return boolean
  amIExist(year): boolean {
    return this.myCalendar.years.some( years => years.year === year );
  }

  // Create calendars inside each month - Datepicker UI
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
                date = new Date(date).getTime();
                let dateIndex = myDates.indexOf(date);
                if (  dateIndex !== -1 ) {
                  myDates.splice(dateIndex, 1);
                } else {
                  myDates.push(date);
                }
                this.createCalendars(myDates);
                this.holidays = this.myDates.length;
                this.updateCalendar();
            },
            beforeShowDay: (date) => {
                date = new Date(date).getTime();
                if ( myDates.indexOf(date) !== -1 ) {
                    return [true, 'holiday', this.uncheckTitle];
                } else {
                    return [true, '', this.checkTitle];
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
  updateNameCalendar(calendarName) {
    if ( this.rForm.valid ) {
      // Returns calendar name 'Capitalized'
      this.myCalendar.name = this.myServices.capitalizeFirstLetter(calendarName.toLowerCase()).trim();
      this.updateCalendar();
    } else {
      console.log('Form not filled correctly');
    }
  }

  updateCalendar() {
    this.myCalendarsServices.updateCalendar(this.myCalendar)
    .subscribe(
      (res: iCalendars[]) => {
        console.log('Correctly updated');
      },
      (err) => {
        console.log('err', err);
      }
    );
  }

  // Show msg positive
  showMsg() {
    if (this.rForm.valid) {
      this.calendarCreatedOk = true;
    }
    setTimeout( () => {
      this.calendarCreatedOk = false;
    }, 2000);
  }

}
