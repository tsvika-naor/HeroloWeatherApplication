import {Component, OnInit} from '@angular/core';
import {WeatherService} from '../weather/weather.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],

})
export class SearchComponent implements OnInit {
  weatherItem;
  query = '';
  key: string;
  selectedOption: any;


  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {
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
    this.query = event.target.value;
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
      this.weatherService.weatherCondition = res[0].WeatherText;
      this.weatherService.temperature = res[0].Temperature.Imperial.Value;
    }, error1 => {
      throw new Error('your error is:' + error1);
    });
    this.weatherService.get5DaysWeatherCast(this.key).subscribe(res => {
      this.weatherService.set5Days(new Date(JSON.parse(JSON.stringify(res.DailyForecasts[0])).EpochDate).getDay());
      this.weatherService.setTemp(res);
    }, err => {
      throw new Error('your error is:' + err);
    });
  }
}

