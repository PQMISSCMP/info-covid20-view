import { Component } from '@angular/core';
import { RouterEvent, RouterOutlet, RouterLinkActive, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fe-corona';

  dataResume: any;
  constructor(private routes: ActivatedRoute) {
    routes.params.subscribe(p => {
      console.log(p);
    });
  }
  procesaPropagar(event) {
    this.dataResume = event;
    // console.log("data grafico: ", event);
  }


}
