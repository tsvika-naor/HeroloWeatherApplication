import {Action} from '@ngrx/store';
import {WeatherItem} from '../weather-item/weather-item.interface';

export const ADD_CITY = 'ADD_CITY';
export const REMOVE_CITY = 'REMOVE_CITY';
export const REMOVE_ALL_CITIES = 'REMOVE_All_CITIES';


 export class AddCity implements Action {

   readonly type = ADD_CITY;

   constructor(public payload: WeatherItem) {}
 }

export class RemoveCity implements Action {

  readonly type = REMOVE_CITY;
  constructor(public payload: number){}
}
export class RemoveAllCities implements Action {

  readonly type = REMOVE_ALL_CITIES;
  constructor(public payload: number){}
}

export type ACTIONS = AddCity | RemoveCity | RemoveAllCities
