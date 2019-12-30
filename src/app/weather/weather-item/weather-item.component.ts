import {Component, OnInit} from '@angular/core';
import {WeatherService} from '../weather.service';
import {Observable} from 'rxjs';
import {WeatherItem} from './weather-item.interface';
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
  checkForDuplicates;

  constructor(private weatherService: WeatherService, private store: Store<AppState>) {
  }

  isFehrenhite = true;
  F = '℉';
  C = '℃';
  cityName: string;
  temperature: number;
  weatherCondition: string;

  ngOnInit() {
  }

  swapTempUnits() {
    this.isFehrenhite = !this.isFehrenhite;
  }

  getName() {
    console.log('blabla');
    console.log(this.weatherService.cityName);
  }

  onSelect() {
    this.cityName = this.weatherService.cityName;
    this.temperature = this.weatherService.temperature;
    this.weatherCondition = this.weatherService.weatherCondition;
    this.store.dispatch(new WeatherActions.AddCity({
      cityName: this.cityName,
      temperature: this.temperature,
      weatherCondition: this.weatherCondition
    }));
  }

}
