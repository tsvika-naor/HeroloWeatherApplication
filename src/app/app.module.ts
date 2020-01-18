import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { SearchComponent } from './search/search.component';
import { WeatherComponent } from './weather/weather.component';
import {HttpClientModule} from '@angular/common/http';
import {WeatherService} from './weather/weather.service';
import {FormsModule} from '@angular/forms';
import {
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatOptionModule,
  MatSelectModule,
  MatCardModule,
  MatToolbarModule,
  MatGridListModule,
  MatDividerModule,
  MatIconModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { WeatherItemComponent } from './weather/weather-item/weather-item.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatChipsModule} from '@angular/material';
import {StoreModule} from '@ngrx/store';
import {reducer} from './weather/store/weather.reducer';
import {AngularFontAwesomeModule} from 'angular-font-awesome';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FavoritesComponent,
    SearchComponent,
    WeatherComponent,
    WeatherItemComponent,
  ],
  imports: [
    StoreModule.forRoot( { weatherItem : reducer }),
    FlexLayoutModule,
    AngularFontAwesomeModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatOptionModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatChipsModule,
    MatGridListModule,
    MatDividerModule,
    MatIconModule


  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
