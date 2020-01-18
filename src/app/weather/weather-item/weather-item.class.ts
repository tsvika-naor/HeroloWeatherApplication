export class WeatherItem {
  cityName: string;
  temperatureImperial: number;
  temperatureMetric: number;
  weatherCondition: string;
  icon: string;

  constructor(cityName, temperatureImperial, temperatureMetric  ,weatherCondition, icon){
    this.cityName = cityName;
    this.temperatureImperial = temperatureImperial;
    this.temperatureMetric = temperatureMetric;
    this.weatherCondition = weatherCondition;
    this.icon = icon;
  }
}

