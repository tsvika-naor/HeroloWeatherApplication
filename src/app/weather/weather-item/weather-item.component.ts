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

  constructor(private weatherService: WeatherService, private store: Store<AppState>) {

  }
  allow: boolean = true;
  addedCities: string[] = [];
  F: string = '℉';
  C: string = '℃';
  isFehrenhite: boolean;
  cityName: string;
  temperatureImperial: number;
  temperatureMetric: number;
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
    this.allow = true;
    this.cityName = this.weatherService.cityName;
    this.temperatureImperial = this.weatherService.temperatureImperial;
    this.temperatureMetric = this.weatherService.temperatureMetric;
    this.weatherCondition = this.weatherService.weatherCondition;
    for (let i = 0 ;i<this.addedCities.length;i++){
      if(this.addedCities[i] === this.cityName) {
        this.allow = false;
        break;
      }
    }
    if(this.allow){
      this.addedCities.push(this.cityName);
    this.store.dispatch(new WeatherActions.AddCity({
      cityName: this.cityName,
      temperatureImperial: this.temperatureImperial,
      temperatureMetric: this.temperatureMetric,
      weatherCondition: this.weatherCondition
    }));
  }}

}
