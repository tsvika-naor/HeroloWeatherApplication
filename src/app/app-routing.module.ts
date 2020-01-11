import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FavoritesComponent} from './favorites/favorites.component';
import {WeatherComponent} from './weather/weather.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: WeatherComponent},
  {path: 'favorites', component: FavoritesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
