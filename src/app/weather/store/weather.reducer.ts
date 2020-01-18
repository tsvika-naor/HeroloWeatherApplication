import * as WeatherActions from './weather.actions';
import {WeatherItem} from '../weather-item/weather-item.class';

export function reducer(state: WeatherItem[] = [], action: WeatherActions.ACTIONS) {

  switch (action.type) {
    case WeatherActions.ADD_CITY: {
      return [...state, action.payload];
    }
    case WeatherActions.REMOVE_CITY: {
      state.splice(action.payload, 1);
      return state;
    }
    case WeatherActions.REMOVE_ALL_CITIES: {
      state.splice(action.payload, 1);
      return state;
    }
    default: {
      return state;
    }
  }
}
