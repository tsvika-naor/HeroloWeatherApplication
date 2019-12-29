import * as WeatherActions from './weather.actions';
import {Action} from '@ngrx/store';
import {WeatherItem} from '../weather-item/weather-item.interface';

export function reducer (state : WeatherItem[] = [], action: WeatherActions.ACTIONS){

switch (action.type) {
  case WeatherActions.ADD_CITY: {
    return [...state, action.payload];
  }
  default: {
      return state;
    }
  }
}
