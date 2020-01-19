import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {WeatherItem} from './weather-item/weather-item.class';
import {DateItem} from '../shared/dateItem.class';

@Injectable()
export class WeatherService implements OnInit {
  citySelected = new Subject<WeatherItem>();
  toggleEmitter = new Subject<boolean>();
  dateEmitter = new Subject<DateItem[]>();
  toggle: boolean;
  weatherItem: WeatherItem;
  minTempInF: string[] = [];
  maxTempInF: string[] = [];
  minTempInC: string[] = [];
  maxTempInC: string[] = [];
  day: string[] = [];
  index: number;
  private cityArray: string[] = [];
  date: DateItem[] = [];
  date_: DateItem;
  temperatureImperial: number;
  temperatureMetric: number;
  weatherCondition: string;
  cityName: string = '';
  // private Key1 ='oNdnipNwzT4GJw8IJ1OnpJsQh1G0lgYG';
  private KEY = 'bKpCXKwVNJLAhn5ZZmuAeXzvfag844K6';
  private autocomplete = 'https://dataservice.accuweather.com/locations/v1/cities/autocomplete';
  private currentConditions = 'https://dataservice.accuweather.com/currentconditions/v1/';
  private fiveDaysWeatherCast = 'https://dataservice.accuweather.com/forecasts/v1/daily/5day/';

  constructor(private http: HttpClient) {

  }

  autoComplete(key): Observable<any> {
    return this.http.get<any>(`${this.autocomplete}?apikey=${this.KEY}&q=${key}`);
  }

  getCurrentWeather(key: string) {
    return this.http.get<any>(`${this.currentConditions}${key}?apikey=${this.KEY}`);
  }

  get5DaysWeatherCast(key: string) {
    return this.http.get<any>(`${this.fiveDaysWeatherCast}${key}?apikey=${this.KEY}`);
  }

  set5Days(epoch) {
    // console.log(epoch);
    for (let i = 0; i < 5; i++) {
      switch (epoch) {
        case 0 : {
          this.day[i] = 'Sunday';
          break;
        }
        case 1 : {
          this.day[i] = 'Monday';
          break;
        }
        case 2 : {
          this.day[i] = 'Tuesday';
          break;
        }
        case 3 : {
          this.day[i] = 'Wednesday';
          break;
        }
        case 4 : {
          this.day[i] = 'Thursday';
          break;
        }
        case 5 : {
          this.day[i] = 'Friday';
          break;
        }
        case 6: {
          this.day[i] = 'Saturday';
          break;
        }
      }
      epoch = epoch + 1;
      if (epoch === 7) {
        epoch = 0;
      }
    }
  }

  selectedCity() {
    this.weatherItem = new WeatherItem(this.cityName, this.temperatureMetric, this.temperatureImperial, this.weatherCondition, this.getIcon(this.cityName));
    this.citySelected.next(this.weatherItem); // emits to weather-item component.

  }

  setTemp(res: any) {

    for (let i = 0; i < 5; i++) {
      const temperature = res.DailyForecasts[i].Temperature;
      this.minTempInF[i] = temperature.Minimum.Value;
      this.maxTempInF[i] = temperature.Maximum.Value;
      this.minTempInC[i] = ((5 / 9) * (temperature.Minimum.Value - 32)).toFixed(0);
      this.maxTempInC[i] = ((5 / 9) * (temperature.Maximum.Value - 32)).toFixed(0);
    }
  }

  getDate(res) {

    for (let i = 0; i < 5; i++) {
      var date = new Date(res.DailyForecasts[i].EpochDate * 1000);
      let year = date.getFullYear();
      let day = date.getDate();
      let month = date.getMonth() + 1;//january is 0 feb is 1 so we add + 1
      this.date[i] = new DateItem(day, month, year);
      console.log(this.date[i]);
    }
    this.dateEmitter.next(this.date);
  }

  savedCities(city: string) {
    console.log(city);
    let state = true;
    for (let i = 0; i < this.cityArray.length; i++) {
      if (this.cityArray[i] === city) {
        state = false;
        this.cityArray.splice(i, 1);
        this.index = i;
        return true;//remove from store
      }
    }
    if (state) {
      this.cityArray.push(city);
      return false; // add to store
    }

  }

  getToggleState(city) {
    let state = false;
    for (let i = 0; i < this.cityArray.length; i++) {
      if (this.cityArray[i] === city) {
        state = true;
        this.toggle = true;
      }
    }
    if (!state) {
      this.toggle = false;
    }

    this.toggleEmitter.next(this.toggle);
  }

  getIcon(icon) {
    switch (icon) {
      case 'Some clouds':
        return 'wi-cloudy';
      case 'Mostly cloudy':
        return 'wi-cloudy';
      case 'Mostly sunny':
        return 'wi-day-sunny';
      case 'Clear':
        return 'wi-day-sunny';
      case 'Partly cloudy':
        return 'wi-night-partly-cloudy';
      case 'Cloudy':
        return 'wi-cloudy';
      case 'Foggy':
        return 'wi-fog';
      case 'Mostly clear':
        return 'wi-day-sunny';
      case 'Rain':
        return 'wi-rain';
      case 'Overcast':
        return 'wi-fog';
      case 'Mist':
        return 'wi-fog';
      case 'Fog':
        return 'wi-fog';
      case 'Sunny':
        return 'wi-day-sunny';
      case 'Clouds and sun':
        return 'wi-day-cloudy-high';
      case 'Dense fog':
        return 'wi-sandstorm';
      case 'Partly sunny':
        return 'wi-sunrise';
      case 'A shower':
        return 'wi-showers';
      case 'Haze':
        return 'wi-day-haze';
      case 'Snow':
        return 'wi-snow';
      case 'Light rain':
        return 'wi-raindrops';
      case 'Snow and fog':
        return 'wi-night-alt-snow';
      case 'Thunderstorm':
        return 'wi-thunderstorm';
      case 'Light fog':
        return 'wi-fog';
      case 'Light snow':
        return 'wi-snow';
    }
  }

  ngOnInit(): void {
  }
}



