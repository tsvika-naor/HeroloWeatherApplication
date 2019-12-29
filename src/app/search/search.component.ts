import {Component, OnInit} from '@angular/core';
import {WeatherService} from '../weather/weather.service';
import {Router} from '@angular/router';

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


  constructor(private weatherService: WeatherService, private router: Router) {
  }

  ngOnInit() {
     this.weatherService.autoComplete('tel-aviv').subscribe((res) => {
       this.weatherItem = res;
       this.selectedOption = res[0];
       this.onSeletct(null);
     })
  }
  onKeypress(event: any) {
    this.query = event.target.value;
    this.weatherService.autoComplete(this.query).subscribe(data => {
      this.weatherItem = data;
    });
  }

  onSeletct(event) {
    this.key = this.selectedOption.Key;
    this.weatherService.cityName = this.selectedOption.LocalizedName;
    this.weatherService.getCurrentWeather(this.key).subscribe(res => {
      this.weatherService.weatherCondition = res[0].WeatherText;
      this.weatherService.temperature = res[0].Temperature.Imperial.Value;
    });
    this.weatherService.get5DaysWeatherCast(this.key).subscribe(res => {
      this.weatherService.set5Days(new Date(JSON.parse(JSON.stringify(res.DailyForecasts[0])).EpochDate).getDay());
      this.weatherService.setTemp(res);
    });
  }
}

