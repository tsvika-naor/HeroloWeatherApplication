import {Component, OnInit} from '@angular/core';
import {WeatherService} from '../weather/weather.service';
import {Observable} from 'rxjs';
import {WeatherItem} from '../weather/weather-item/weather-item.interface';
import {Store} from '@ngrx/store';
import {AppState} from '../app.state';
import * as WeatherActions from '../weather/store/weather.actions';
import * as url from 'url';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser'



@Component({
  selector: 'app-favorits',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  enableDelete:boolean = true;
  weather$: Observable<WeatherItem[]>;
  index: number;
  isFehrenhite: boolean = true;
  F: string = '℉';
  C: string = '℃';
  backgroundImg: any;

  constructor(private weatherService: WeatherService, private store: Store<AppState>, private sanitizer:DomSanitizer) {
    this.weather$ = this.store.select('weatherItem');
  }

  ngOnInit() {
  }

  removeCity() {
    this.store.dispatch(new WeatherActions.RemoveCity(this.index));
    this.enableDelete = true;
  }

  passIndex(index) {
    console.log(index);
    this.index = index;
    this.enableDelete = false;
  }
  swapTempUnits() {
    this.isFehrenhite = !this.isFehrenhite;
  }
  backgroundStyle(condition){
    switch (condition) {
      case 'Mostly sunny': {
        this.backgroundImg =  this.sanitizer.bypassSecurityTrustStyle('https://cdn.dodowallpaper.com/full/761/sky-hd-1.jpg');
        break;
      }
      case 'b' :{
        break
      }
      case 'c' :{
        break
      }
      case 'd' :{
        break
      }
      case 'e' :{
        break
      }

    }
  }
}
