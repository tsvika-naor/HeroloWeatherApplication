import { Injectable } from '@angular/core';
import {Action} from '@ngrx/store';
import {WeatherItem} from '../weather-item/weather-item.interface';

export const ADD_CITY = 'ADD_CITY';
export const REMOVE_CITY = 'REMOVE_CITY';


 export class AddCity implements Action {

   readonly type = ADD_CITY;

   constructor(public payload: WeatherItem) {}
 }

export class RemoveCity implements Action {

  readonly type = REMOVE_CITY;
  constructor(public payload: number){}
}

export type ACTIONS = AddCity | RemoveCity
