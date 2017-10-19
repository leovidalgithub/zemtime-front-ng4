import { Injectable } from '@angular/core';

// Jquery UI calendar translations service
@Injectable()
export class CalendarLangService {

  private language;
  private es: Object;
  private ca: Object;
  private en: Object;

  constructor() {

    // This info comes from https://github.com/jquery/jquery-ui/tree/master/ui/i18n
    // Choose the language you want and erase the 'DateFormat' option (it affects other functionalities), create a property, construct it and add it to the switch cases.
    this.es = {
      closeText: 'Cerrar',
      prevText: '&#x3C;Ant',
      nextText: 'Sig&#x3E;',
      currentText: 'Hoy',
      monthNames: [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ],
      monthNamesShort: [ 'ene', 'feb', 'mar', 'abr', 'may', 'jun',
       'jul', 'ago', 'sep', 'oct', 'nov', 'dic' ],
      dayNames: [ 'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado' ],
      dayNamesShort: [ 'dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb' ],
      dayNamesMin: [ 'Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá' ],
      weekHeader: 'Sm',
      firstDay: 1,
      isRTL: false,
      showMonthAfterYear: false,
      yearSuffix: ''
    };

    this.ca = {
      closeText: 'Tanca',
      prevText: 'Anterior',
      nextText: 'Següent',
      currentText: 'Avui',
      monthNames: [ 'Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny',
      'Juliol', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Desembre' ],
      monthNamesShort: [ 'gen', 'feb', 'març', 'abr', 'maig', 'juny',
      'jul', 'ag', 'set', 'oct', 'nov', 'des' ],
      dayNames: [ 'diumenge', 'dilluns', 'dimarts', 'dimecres', 'dijous', 'divendres', 'dissabte' ],
      dayNamesShort: [ 'dg', 'dl', 'dt', 'dc', 'dj', 'dv', 'ds' ],
      dayNamesMin: [ 'Dg', 'Dl', 'Dt', 'Dc', 'Dj', 'Dv', 'Ds' ],
      weekHeader: 'Set',
      firstDay: 1,
      isRTL: false,
      showMonthAfterYear: false,
      yearSuffix: ''
    };

    this.en = {
      closeText: 'Done',
        prevText: 'Prev',
        nextText: 'Next',
        currentText: 'Today',
        monthNames: [ 'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December' ],
        monthNamesShort: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
        dayNames: [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
        dayNamesShort: [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],
        dayNamesMin: [ 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa' ],
        weekHeader: 'Wk',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };

  }

  // Depending on the lang that arrives choose one or other language
  getCalendarLang(lang) {
    switch (lang) {
      case 'es':
        this.language = this.es;
        break;
      case 'ca':
        this.language = this.ca;
        break;
      case 'en':
        this.language = this.en;
        break;
    }
    return this.language;
  }


}




// {
//   'calendarLang' : {
//     'es' : {
//       'closeText': 'Cerrar',
//       'prevText': '&#x3C;Ant',
//       'nextText': 'Sig&#x3E;',
//       'currentText': 'Hoy',
//       'monthNames': [ 'enero','febrero','marzo','abril','mayo','junio',
//       'julio','agosto','septiembre','octubre','noviembre','diciembre' ],
//       'monthNamesShort': [ 'ene','feb','mar','abr','may','jun',
//       'jul','ago','sep','oct','nov','dic' ],
//       'dayNames': [ 'domingo','lunes','martes','miércoles','jueves','viernes','sábado' ],
//       'dayNamesShort': [ 'dom','lun','mar','mié','jue','vie','sáb' ],
//       'dayNamesMin': [ 'D','L','M','X','J','V','S' ],
//       'weekHeader': 'Sm',
//       'dateFormat': 'dd/mm/yy',
//       'firstDay': 1,
//       'isRTL': false,
//       'showMonthAfterYear': false,
//       'yearSuffix': ''
//     },
//     'en' : {
//       'closeText': 'Done',
//       'prevText': 'Prev',
//       'nextText': 'Next',
//       'currentText': 'Today',
//       'monthNames': [ 'January','February','March','April','May','June',
//       'July','August','September','October','November','December' ],
//       'monthNamesShort': [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
//       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
//       'dayNames': [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
//       'dayNamesShort': [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],
//       'dayNamesMin': [ 'Su','Mo','Tu','We','Th','Fr','Sa' ],
//       'weekHeader': 'Wk',
//       'dateFormat': 'dd/mm/yy',
//       'firstDay': 1,
//       'isRTL': false,
//       'showMonthAfterYear': false,
//       'yearSuffix': ''
//     }
//   }
// }

