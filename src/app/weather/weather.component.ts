import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {WeatherService} from './weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],

})
export class WeatherComponent implements OnInit {

  constructor(private router:Router, private weatherService: WeatherService) { }

  ngOnInit() {
  }
}
