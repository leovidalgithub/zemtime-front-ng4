import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute, Params, RouterLink } from '@angular/router';


@Component({
  selector:    'zem-calendars',
  templateUrl: './calendars.component.html',
  styleUrls:   ['./calendars.component.scss']
})

export class CalendarsComponent implements OnInit {


  // Calendars first filter
  private countryShow:  Boolean = true;
  private countryArray: Array<string>;

  private comShow:      Boolean = false;
  private comArray:     Array<string>;

  private cityShow:     Boolean = false;
  private cityArray:    Array<string>;

  // Show country on load
  private typeView =   'countryShow';

  // Header data
  sectionData = {
    title:            'calendars.title',
    titleClass:       'mdi mdi-calendar-range',
    notificationShow: false,
    spanShow:         false
  };
  actionsShow = {
    showActions:      false
  };

  // TEST ARRAY
  // TODO: borrar
  paises = [
    'España', 'USA', 'Colombia', 'Perú'
  ];
  cas = [
    'Catalunya', 'País Vasco', 'Madrid', 'Andalucía'
  ];
  ciudades = [
    'Barcelona', 'Bilbao', 'Madrid', 'Sevilla'
  ];


  constructor(
    private translate: TranslateService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() { }

  selectSubfilter(item) {
    console.log(item);

  }

}
