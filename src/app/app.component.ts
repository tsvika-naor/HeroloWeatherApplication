import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private renderer: Renderer2) {
    this.renderer.addClass(document.body, 'body-class');
  }

  color: boolean = true;

  getColor(event) {
    this.color = event;
    let tempColor = 'rgb(0,70,130)';
    if (this.color === false) {
      tempColor = 'lightslategrey';
    }
    this.renderer.setStyle(document.body, 'backgroundColor', tempColor);
  }

  ngOnInit(): void {
    this.renderer.setStyle(document.body, 'backgroundColor', 'rgb(0,70,130)');

  }
}
