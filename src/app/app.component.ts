import { Component } from '@angular/core';
import { CasosResume } from './features/info-covid/model/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Covid 20 - view';

  dataResume: CasosResume[];
  constructor() { }

  onProveerGraficos(event) {
    this.dataResume = event;
  }


}
