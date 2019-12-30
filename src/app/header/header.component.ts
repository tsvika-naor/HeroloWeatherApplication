import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {WeatherService} from '../weather/weather.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  color = true;
  constructor(weatherService: WeatherService) { }
@Output() changeColor = new EventEmitter<boolean>()
  ngOnInit() {
  }
  onClick() {
    this.color = !this.color;
    this.changeColor.emit(this.color);
  }
}
