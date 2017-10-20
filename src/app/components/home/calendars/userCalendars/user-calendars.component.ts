import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { TranslationService, iCalendars, MyServices } from '../../../../shared';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ViewEncapsulation } from '@angular/core';
// import { CalendarsServices } from '../calendars.services';

declare var $: any; // Jquery

@Component({
    selector: 'zem-user-calendars',
    templateUrl: 'user-calendars.component.html',
    styleUrls: ['user-calendars.component.scss'],
    // encapsulation: ViewEncapsulation.None
})
export class UserCalendarsComponent implements OnInit, OnChanges {

  // Form props
  private rForm:             FormGroup; // Input calendar title
  private calendarCreatedOk: Boolean = false; // Positive msg

  constructor(
      private myTranslate:           TranslationService,
      private translate:             TranslateService,
      private myServices:            MyServices,
      private fb:                    FormBuilder,
      // private myCalendarLangService: CalendarLangService,
      // private myCalendarsServices:   CalendarsServices
  ) {
    // Input calendar title
    // this.rForm = fb.group({
    //   'nameNewCalendar': [ null, Validators.compose([ Validators.required, Validators.minLength(2), Validators.maxLength(21) ]) ]
    // });

  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {

  }

}
