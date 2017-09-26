import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent, AuthComponent, HomeComponent, DashboardComponent } from './components';
import { ApiService, AlwaysAuthGuard, UserService } from './shared';
import { APP_ROUTING } from './app.routing';

import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

// ia-components
import { IaCompHeaderComponentLight } from 'ia-comp-header';
import { IaCompSidebarComponentLight } from 'ia-comp-sidebar';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    APP_ROUTING
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent,
    LoginComponent,
    DashboardComponent,
    IaCompHeaderComponentLight,
    IaCompSidebarComponentLight
  ],
  providers: [
    ApiService,
    AlwaysAuthGuard,
    UserService
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
