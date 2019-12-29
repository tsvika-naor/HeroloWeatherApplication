import {Component, ElementRef, ViewChild} from '@angular/core';
import {WeatherService} from './weather/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    color: boolean;
    getColor(event){
      this.color = event;
    }
}
