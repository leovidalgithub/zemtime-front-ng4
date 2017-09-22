import { RouterModule, Routes } from '@angular/router';
import { HomeComponent, AuthComponent, LoginComponent, DashboardComponent } from './components';
import { AlwaysAuthGuard } from './shared';

const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent, canActivate: [AlwaysAuthGuard],
    children: [
        { path: '', redirectTo: 'login', pathMatch: 'full' },
        { path: 'login', component: LoginComponent }
      ]
  },
  { path: 'home', component: HomeComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent }
      ]
  },
  { path: '**', redirectTo: 'auth', pathMatch: 'full' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash: true});
