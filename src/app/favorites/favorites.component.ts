import {Component, OnInit} from '@angular/core';
import {WeatherService} from '../weather/weather.service';
import {Observable} from 'rxjs';
import {WeatherItem} from '../weather/weather-item/weather-item.interface';
import {Store} from '@ngrx/store';
import {AppState} from '../app.state';
import * as WeatherActions from '../weather/store/weather.actions';


@Component({
  selector: 'app-favorits',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  enableDelete: boolean = true;
  weather$: Observable<WeatherItem[]>;
  index: number;
  isFehrenhite: boolean = true;
  F: string = '℉';
  C: string = '℃';

  constructor(private weatherService: WeatherService, private store: Store<AppState>) {
    this.weather$ = this.store.select('weatherItem');
  }

  ngOnInit() {
  }

  removeCity() {
    this.store.dispatch(new WeatherActions.RemoveCity(this.index));
    this.enableDelete = true;
  }

  removeallCities() {
    for (let i = 0; i < 100; i++) {
      this.store.dispatch(new WeatherActions.RemoveCity(0));
    }
  }

  passIndex(index) {
    console.log(index);
    this.index = index;
    this.enableDelete = false;
  }

  swapTempUnits() {

    this.isFehrenhite = !this.isFehrenhite;
  }

  backgroundStyle(condition) {

    switch (condition) {
      case 'Partly cloudy': {
        return 'url(\'https://preview.redd.it/mvm28cb88jv21.jpg?width=960&crop=smart&auto=webp&s=a76fbed024044f3838b61bf1c96abae50bac6938\')';
      }
      case 'Mostly cloudy': {
        return 'url(\'https://www.novinite.com/media/images/2019-12/photo_verybig_202178.jpg\')';
      }
      case 'Sunny' : {
        return 'url(\'https://img.resized.co/lovindublin_com/eyJkYXRhIjoie1widXJsXCI6XCJodHRwczpcXFwvXFxcL2ltYWdlcy5sb3ZpbmR1Ymxpbi5jb21cXFwvdXBsb2Fkc1xcXC9pbWFnZXNcXFwvX3JlbGF0ZWRFbnRyeUltYWdlMnhcXFwvU2NyZWVuLVNob3QtMjAxNy0wNS0wNi1hdC0xMy4yNC4wMi5wbmdcIixcIndpZHRoXCI6NzM2LFwiaGVpZ2h0XCI6NDEyLFwiZGVmYXVsdFwiOlwiaHR0cHM6XFxcL1xcXC9kMjZoZTAzOGE3MGRncy5jbG91ZGZyb250Lm5ldFxcXC93cC1jb250ZW50XFxcL3RoZW1lc1xcXC9sb3ZpblxcXC9hc3NldHNcXFwvaW1nXFxcL2NhcmQtZGVmYXVsdC1sb3Zpbi1kdWJsaW4ucG5nXCJ9IiwiaGFzaCI6IjQxMmEzMzVjMjBkNzBjM2FhZDIzYTRlYzVkNmIxYzlmMDBmZTIzZGUifQ==/grey-skies-begone-the-sunny-weather-will-return-tomorrow.png\')';
      }
      case 'Cloudy' : {
        return 'url(\'https://upload.wikimedia.org/wikipedia/commons/3/30/CloudColors.jpg\')';
      }
      case 'Rainy' : {
        return 'url(\'https://www.guilford.edu/sites/default/files/styles/full_image_large_scale/public/images/2018-11/rain-drops-on-window-1827098_1920.jpg?itok=pccWva6b\')';
      }
      case 'Clear': {
        return 'url(\'https://img4.goodfon.com/wallpaper/nbig/e/cc/nebo-oblaka-iasnaia-pogoda-solntse-priroda.jpg\')';
      }
      case 'Overcast': {
        return 'url(\'https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/overcast-weather-in-bantry-bay-luke-white.jpg\')';
      }
      case 'Partly sunny': {
        return 'url(\'http://2.bp.blogspot.com/-QK3z166ztbg/URChSc5I-dI/AAAAAAAAAIo/BEoDCQNNzic/s1600/mostly+sunny.jpg\')';
      }
      case 'Some clouds': {
        return 'url(\'https://somuchtoseesomuchtodo.files.wordpress.com/2011/06/sky-and-clouds.jpg\')';
      }
      case 'Mostly clear': {
        return 'url(\' https://ak8.picdn.net/shutterstock/videos/1007359978/thumb/2.jpg\')';
      }
      case 'Rain and snow': {
        return 'url(\'https://pbs.twimg.com/media/DUd9is3X4AA2Vr5.jpg\')';
      }
      case 'Light fog': {
        return 'url(\'https://cdn.pixabay.com/photo/2017/06/16/00/22/fog-2407344_960_720.jpg\')';
      }

    }
  }
}
