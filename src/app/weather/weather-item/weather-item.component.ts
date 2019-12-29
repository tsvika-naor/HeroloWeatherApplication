import {Component, OnInit} from '@angular/core';
import {WeatherService} from '../weather.service';
import {Observable} from 'rxjs';
import { WeatherItem} from './weather-item.interface';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.state';
import * as WeatherActions from '../store/weather.actions';


@Component({
  selector: 'app-weather-item',
  templateUrl: './weather-item.component.html',
  styleUrls: ['./weather-item.component.css'],
})
export class WeatherItemComponent implements OnInit {
  weather: Observable<WeatherItem[]>;
  weatherItem: WeatherItem;

  constructor(private weatherService: WeatherService, private store: Store<AppState>) {
  }

  isFehrenhite = true;
  private F = '°F';
  private C = '°C';

  ngOnInit() {
  }

  swapTempUnits() {
    this.isFehrenhite = !this.isFehrenhite;
  }

  onSelect() {
    this.store.dispatch(new WeatherActions.AddCity({
      cityName: this.weatherService.cityName,
      temperature: this.weatherService.temperature,
      weatherCondition: this.weatherService.weatherCondition
    }));
  }

}
