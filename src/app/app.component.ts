import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fe-corona';

  dataResume: any;
  constructor() { }
  procesaPropagar(event) {
    this.dataResume = event;
  }


}
