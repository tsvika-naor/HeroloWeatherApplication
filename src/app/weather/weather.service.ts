import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class WeatherService implements OnInit {

  minTempInF = [];
  maxTempInF = [];
  minTempInC = [];
  maxTempInC = [];
  day = [];

  temperature = 0;
  weatherCondition = '';
  cityName = '';
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
    console.log(epoch);
    for (let i = 0; i < 5; i++) {
      if (epoch === 0) {
        this.day[i] = 'Sun';
      }
      if (epoch === 1) {
        this.day[i] = 'Mon';
      }
      if (epoch === 2) {
        this.day[i] = 'Tue';
      }
      if (epoch === 3) {
        this.day[i] = 'Wed';
      }
      if (epoch === 4) {
        this.day[i] = 'Thu';
      }
      if (epoch === 5) {
        this.day[i] = 'Fri';
      }
      if (epoch === 6) {
        this.day[i] = 'Sat';
      }
      epoch = epoch + 1;
      if (epoch === 7) {
        epoch = 0;
      }
    }
  }

  setTemp(res: any) {

    console.log(res);
    for (let i = 0; i < 5; i++) {
      const temperature = res.DailyForecasts[i].Temperature;
      this.minTempInF[i] = temperature.Minimum.Value;
      this.maxTempInF[i] = temperature.Maximum.Value;
      this.minTempInC[i] = ((5 / 9) * (temperature.Minimum.Value - 32)).toFixed(0);
      this.maxTempInC[i] = ((5 / 9) * (temperature.Maximum.Value - 32)).toFixed(0);
    }
  }

}



