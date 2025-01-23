import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { MissingPersonCardComponent } from './missing-person-card/missing-person-card.component';
import { MissingPersonsComponent } from './missing-persons/missing-persons.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'profile/:id', component: ProfileComponent, children: [
    {path: 'create', component: ProfileComponent, pathMatch: 'full'},
    {path: 'delete', component: ProfileComponent, pathMatch: 'full'}

  ]},
  // { path: '',   redirectTo: '/first-component', pathMatch: 'full' }, // redirect to `first-component`
  { path: 'card/:id', component: MissingPersonCardComponent, pathMatch: 'full'},
  { path: 'map', component: MapComponent},
  { path: 'missing', component: MissingPersonsComponent},
  // { path: '**', component: HomeComponent, redirectTo: '' },  // Wildcard route for a 404 page
];
