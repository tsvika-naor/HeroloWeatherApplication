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
  maxF: string[];
  minF: string[];
  maxC: string[];
  minC: string[];
  day: string[];

  ngOnInit() {
    this.day = this.weatherService.day;
    this.maxF = this.weatherService.maxTempInF;
    this.minF = this.weatherService.minTempInF;
    this.maxC = this.weatherService.maxTempInC;
    this.minC = this.weatherService.minTempInC;
  }

  swapTempUnits() {
    this.isFehrenhite = !this.isFehrenhite;
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
