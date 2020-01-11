import {Component, OnInit} from '@angular/core';
import {WeatherService} from '../weather/weather.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],

})
export class SearchComponent implements OnInit {

  weatherItem: any;
  query: string;
  key: string;
  selectedOption: any;

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {
    console.log('hello');
    this.weatherService.autoComplete('tel-aviv').subscribe((res) => {
        this.weatherItem = res;
        this.selectedOption = res[0];
        this.onSeletct();
      },
      error1 => {
        throw new Error('your error is:' + error1);
      });
  }

  onKeypress(event: any) {
    this.query = JSON.parse(JSON.stringify(event.target.value));
    this.weatherService.autoComplete(this.query).subscribe(data => {
      this.selectedOption = data[0];
      this.onSeletct();
      this.weatherItem = data;
    });
  }

  onSeletct() {
    this.key = this.selectedOption.Key;
    this.weatherService.cityName = this.selectedOption.LocalizedName;
    this.weatherService.getCurrentWeather(this.key).subscribe(res => {
      console.log(res[0].Temperature);
      this.weatherService.weatherCondition = res[0].WeatherText;
      this.weatherService.temperatureImperial = res[0].Temperature.Imperial.Value.toFixed(0);//F
      this.weatherService.temperatureMetric = res[0].Temperature.Metric.Value.toFixed(0);//C
    }, error1 => {
      throw new Error('your error is:' + error1);
    });
    this.weatherService.get5DaysWeatherCast(this.key).subscribe(res => {
      this.weatherService.set5Days(JSON.parse(JSON.stringify(new Date((res.DailyForecasts[0]).EpochDate*1000).getDay())));
      this.weatherService.setTemp(res);
    }, err => {
      throw new Error('your error is:' + err);
    });
  }
}

