import { Component, OnInit, ElementRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ViewEncapsulation } from '@angular/core';

declare var $: any;

@Component({
  selector: 'zem-calendar-selected',
  templateUrl: 'calendar.component.html',
  styleUrls: ['calendar.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class CalendarComponent implements OnInit {

  monthArray: Array<string> = [];
  currentYear: number = new Date().getFullYear();

  datesArray: Array<any> = [];

  testDates = Date.now();
  datesObject = {};

  constructor(private translate: TranslateService, private elementRef: ElementRef) {

  }

  ngOnInit() {
    this.servicioDates();
    this.createMonths();
    this.createCalendars();
  }


  servicioDates() {
    for( let i = 1; i < 20; i++ ) {
        let dayNumber = Math.floor((Math.random() * 30) + 1);
        let newDate = new Date(2017,0,dayNumber).getTime();
        if (!this.datesObject[newDate]) {
            this.datesObject[newDate] = {};
            this.datesObject[newDate].type = 'holiday';
        }
    }
  }


  // selectedDay(date, inst) {
  //   let day = inst.currentDay;
  //   let month = inst.currentMonth + 1;

  //   // console.log(inst.dpDiv.find('.ui-state-default'));


  //   let selectedMonthContainer = $(`#calendar-${month}`).children('.ui-datepicker-inline');
  //   let selectedMonth = selectedMonthContainer.find('.ui-datepicker-current-day');

  //   let thisMonth = selectedMonthContainer[0];
  //   // thisMonth.getElementsByTagName("a").classList.add('workingDay')
  //   thisMonth.getElementsByTagName("a")[6].parentNode.firstChild.classList.add('workingDay');
  //   console.log(thisMonth.getElementsByTagName("a")[6].parentNode.firstChild);

  // }

  createCalendars() {
    for (let month = 1; month < 13; month++) {
      $(`#calendar-${month}`).datepicker( {
        changeYear: false,
        changeMonth: false,
        stepMonths: 0,
        defaultDate: new Date( month + '/01/' + this.currentYear ),
        // dateFormat: 'dd-mm-yy',
        showMonthAfterYear: false,
        firstDay: 1,
        inline: true,
        onSelect: (date, inst) => { // devuelve el día
          date = new Date(date).getTime();

          if ( this.datesObject[date] ) {
            delete this.datesObject[date];
          } else {
            this.datesObject[date] = {};
            this.datesObject[date].type = 'holiday';
          }

          console.log(this.datesObject);
          this.createCalendars();

        },
        beforeShowDay : (date) => {
          date = new Date(date).getTime();
          if( this.datesObject[date] ) {
             return [ true, 'eventDay', 'eventDay']
          } else {
            return [ true, '', 'holiday']
          }
        }
      } );
    }
  }




  createMonths() {
    $('#months div').remove();
    for (let i = 1; i < 13; i++) {
      $(`<div/>`, {
        id: `calendar-${i}`,
        class: `calendar`
      }).appendTo('#months');
    }
  }

}
