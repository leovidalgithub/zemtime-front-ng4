import { iCalendars } from './../../../../shared/shared.interfaces';
import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { TranslationService, iCalendars, MyServices } from '../../../../shared';
import { TranslateService } from '@ngx-translate/core';
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
  @Input('currentType') currentType: number;
  @Input('myCalendars') myCalendars: Array<iCalendars>;

  private years = [
    new Date().getFullYear() - 1,
    new Date().getFullYear(),
    new Date().getFullYear() + 1
  ];


  // Form props
  private rForm:             FormGroup;
  private calendarCreatedOk: Boolean = false;
  private calendarExists:    Boolean = false;
  private holidays:          number;

  // Calendar props
  private myCalendar:        iCalendars;
  private myDates:           Array<number>;
  private yearSelected:      number  = this.years[1];

  // Delete props
  private deleteConfirm:     Boolean = false;

  constructor(
      private myTranslate:              TranslationService,
      private translate:                TranslateService,
      private myServices:               MyServices,
      private myGetCalendarLangService: GetCalendarLangService,
      private fb:                       FormBuilder
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
    this.myCalendar = this.myCalendars.find( calendar => calendar.id === this.currentId );
    // this.myCalendar = this.myCalendars.filter( calendar => calendar.id === this.currentId );

    // If there is a calendar with this year create myDates and turn true variable
    if (this.myCalendar.years.some( years => years.year === this.yearSelected )) {
      this.myDates = this.myCalendar.years.find( years => years.year === this.yearSelected ).days;
    } else {
      this.myDates = [];
    }
    this.createMonths();
    this.createCalendars(this.myDates);
    this.holidays = this.myDates.length;
  }

  amIExist(year): boolean {
    return this.myCalendar.years.some( years => years.year === year );
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
                this.holidays = this.myDates.length;
                console.log(myDates);
                console.log(this.myCalendar);
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

  // Save a new calendar (rForm onSubmit or input blur)
  updateNameCalendar(calendarName) {
    // if form is correct
    if ( this.rForm.valid ) {
      // Returns calendar name 'Capitalized'
      this.myCalendar.name = this.myServices.capitalizeFirstLetter(calendarName.toLowerCase()).trim();
      this.showMsg();
      // Update calendar
      this.updateCalendar();
    } else {
      console.log('Form not filled correctly');
    }
  }

  updateCalendar() {
    this.myGetCalendarService.updateCalendar(this.myCalendar)
    .subscribe(
      (res: iCalendars) => { },
      (err) => {
        console.log('err',err);
      }
    )
  }

  // Show msg positive
  showMsg() {
    this.calendarCreatedOk = true;
    setTimeout( () => {
      this.calendarCreatedOk = false;
    }, 2000);
  }

  // Show alert negative
  // showAlert() {
  //   this.calendarExists = true;
  //   setTimeout( () => {
  //     this.calendarExists = false;
  //   }, 1500);
  // }

}
