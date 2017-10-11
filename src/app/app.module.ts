import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { APP_ROUTING } from './app.routing';

// COMPONENTS
import { AppComponent } from './app.component';
import { LoginComponent, AuthComponent, HomeComponent, DashboardComponent,
          CalendarComponent, CalendarsComponent, CalendarsTypesPipe } from './components';
// ia-components
import { IaCompHeaderComponent } from 'ia-comp-header';
import { IaCompSidebarComponent } from 'ia-comp-sidebar';

// SERVICES
import { TranslationService, AlwaysAuthGuard, UserService } from './shared';
import { GetCalendarsServices, GetCalendarServices } from './components';

import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

// TRANSLATE
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, 'assets/locale/', '.json');
}

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    APP_ROUTING,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent,
    LoginComponent,
    DashboardComponent,
    IaCompHeaderComponent,
    IaCompSidebarComponent,
    CalendarsComponent,
    CalendarComponent,
    CalendarsTypesPipe
  ],
  providers: [
    TranslationService,
    AlwaysAuthGuard,
    UserService,
    GetCalendarsServices,
    GetCalendarServices
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) { }
  hmrOnInit(store) {
    console.log('HMR store', store);
  }
  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
