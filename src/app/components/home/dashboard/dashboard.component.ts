import { Component, OnInit } from '@angular/core';
import { TranslationService } from '../../../shared';

@Component({
  selector: 'zem-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  private headerData: object = {
    sectionData : {
      title: this.myTranslate.getTranslation('dashboard.title'),
      titleClass: 'mdi mdi-bell-outline',
      notificationShow: true,
      notificationCondition: '1',
      notificationResult: '4',
      span: this.myTranslate.getTranslation('calendars.calendar'),
      spanName: ' Barcelona',
      spanShow: true
    },
    actionsShow : {
      showActions: true
    },
    actionButtons: [
      {
        text: this.myTranslate.getTranslation('general.buttons.ok'),
        buttonClass: 'bt-act',
        title: false,
        show:  true,
        clickAction: function(){
          alert('clicar el botón 1');
        }
        // clickParameters: '',
      }, {
        text: this.myTranslate.getTranslation('general.buttons.cancel'),
        buttonClass: 'bt-pos',
        title: false,
        show:  true,
        clickAction: function(){
          alert('clicar el botón 2');
        },
        // clickParameters: '',
      }
    ]
  };

  constructor(private myTranslate: TranslationService) { }

  ngOnInit() { }

}

