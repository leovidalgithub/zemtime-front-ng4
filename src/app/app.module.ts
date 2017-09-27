import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import {  } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { LoginComponent, AuthComponent, HomeComponent, DashboardComponent } from './components';
import { ApiService, AlwaysAuthGuard, UserService } from './shared';
import { APP_ROUTING } from './app.routing';

import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

// export function HttpLoaderFactory(http: )

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    APP_ROUTING,
    TranslateModule.forRoot()
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent,
    LoginComponent,
    DashboardComponent
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
