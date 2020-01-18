import {Component, OnInit} from '@angular/core';
import {WeatherService} from '../weather.service';
import {Observable} from 'rxjs';
import {WeatherItem} from './weather-item.class';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.state';
import * as WeatherActions from '../store/weather.actions';
import {DateItem} from '../../shared/dateItem.class';

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
  dispatch: boolean;
  index:number;
  F: string = '℉';
  C: string = '℃';
  cityName: string;
  temperatureImperial: number;
  temperatureMetric: number;
  weatherCondition: string;
  maxF: string[];
  minF: string[];
  maxC: string[];
  minC: string[];
  day: string[];
  toggle: boolean = false;
  currentCity: WeatherItem;
  iconConvertions: string;
  date: DateItem[];



  ngOnInit() {
    this.day = this.weatherService.day;
    this.maxF = this.weatherService.maxTempInF;
    this.minF = this.weatherService.minTempInF;
    this.maxC = this.weatherService.maxTempInC;
    this.minC = this.weatherService.minTempInC;

    this.weatherService.citySelected.subscribe(res => {
      this.iconConvertions = this.weatherService.getIcon(res.weatherCondition);
      this.currentCity = new WeatherItem(res.cityName, res.temperatureImperial, res.temperatureMetric, res.weatherCondition, this.iconConvertions);
    });
    this.weatherService.toggleEmitter.subscribe(res => {
      this.toggle = res;
    });
    this.weatherService.dateEmitter.subscribe(res => {
      this.date = res;
      console.log(this.date);
    });
  }

  onSelect() {

    this.toggle = !this.toggle;
    this.dispatch = this.weatherService.savedCities(this.currentCity.cityName);

    if(this.dispatch) {
      this.store.dispatch(new WeatherActions.RemoveCity(this.weatherService.index));
    }
    else {
      this.store.dispatch(new WeatherActions.AddCity({
        cityName: this.currentCity.cityName,
        temperatureImperial:  this.currentCity.temperatureImperial,
        temperatureMetric: this.currentCity.temperatureMetric,
        weatherCondition: this.currentCity.weatherCondition,
        icon: this.currentCity.icon
      }));
    }
  }

}
