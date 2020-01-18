import {Component, OnInit} from '@angular/core';
import {WeatherService} from '../weather/weather.service';
import {Observable} from 'rxjs';
import {WeatherItem} from '../weather/weather-item/weather-item.class';
import {Store} from '@ngrx/store';
import {AppState} from '../app.state';
import * as WeatherActions from '../weather/store/weather.actions';


@Component({
  selector: 'app-favorits',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  enableDelete: boolean = true;
  weather$: Observable<WeatherItem[]>;
  index: number;
  isFehrenhite: boolean = true;
  F: string = '℉';
  C: string = '℃';

  constructor(private weatherService: WeatherService, private store: Store<AppState>) {
    this.weather$ = this.store.select('weatherItem');
  }

  ngOnInit() {

  }

  removeCity() {
    this.store.dispatch(new WeatherActions.RemoveCity(this.index));
    this.enableDelete = true;
  }

  removeallCities() {
    for (let i = 0; i < 100; i++) {
      this.store.dispatch(new WeatherActions.RemoveCity(0));
    }
  }

  passIndex(index) {
    // console.log(index);
    this.index = index;
    this.enableDelete = false;
  }

  swapTempUnits() {

    this.isFehrenhite = !this.isFehrenhite;
  }
}

