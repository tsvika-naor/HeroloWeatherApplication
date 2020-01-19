import {Component, OnInit} from '@angular/core';
import {WeatherService} from '../weather/weather.service';
import {Observable} from 'rxjs';
import {WeatherItem} from '../weather/weather-item/weather-item.class';
import {Store} from '@ngrx/store';
import {AppState} from '../app.state';


@Component({
  selector: 'app-favorits',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  enableDelete: boolean = true;
  weather$: Observable<WeatherItem[]>;
  index: number;
  F: string = '℉';
  C: string = '℃';

  constructor(private weatherService: WeatherService, private store: Store<AppState>) {
    this.weather$ = this.store.select('weatherItem');
  }

  ngOnInit() {
  }

  passIndex(index) {
    this.index = index;
    this.enableDelete = false;
  }

}

