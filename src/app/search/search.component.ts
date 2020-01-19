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
  selectedOption: any = [];
  private firstLoad: string = 'tel-aviv';


  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {

    this.weatherService.autoComplete(this.firstLoad).subscribe((res) => {
        this.weatherItem = res;
        this.selectedOption = res[0];
        this.onSelect();
      },
      error1 => {
        throw new Error('your error is:' + error1);
      });

  }

  onKeypress(event: any) {
    this.query = JSON.parse(JSON.stringify(event.target.value));
    this.weatherService.autoComplete(this.query).subscribe(data => {
      if (data != null) {
        this.selectedOption = data[0];
        if (this.selectedOption === undefined)
          this.selectedOption = '';
        this.weatherItem = data;
        this.onSelect();

      }
    });
  }

  onSelect() {

      this.weatherService.getToggleState(this.selectedOption.LocalizedName);
      this.key = this.selectedOption.Key;
      this.weatherService.cityName = this.selectedOption.LocalizedName;

      this.weatherService.getCurrentWeather(this.key).subscribe(res => {
        this.weatherService.weatherCondition = res[0].WeatherText;
        this.weatherService.temperatureImperial = res[0].Temperature.Imperial.Value.toFixed(0);//F
        this.weatherService.temperatureMetric = res[0].Temperature.Metric.Value.toFixed(0);//C
        this.weatherService.selectedCity();
      }, error1 => {
        throw new Error('your error is:' + error1);
      });
      this.weatherService.get5DaysWeatherCast(this.key).subscribe(res => {
        console.log(res);
        this.weatherService.set5Days(JSON.parse(JSON.stringify(new Date((res.DailyForecasts[0]).EpochDate * 1000).getMonth())));
        this.weatherService.setTemp(res);
        this.weatherService.getDate(res);
      }, err => {
        throw new Error('your error is:' + err);
      });
    }
}

