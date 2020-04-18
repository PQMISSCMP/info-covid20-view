import { Component, Input } from '@angular/core';
import { InfoHeader } from '../../model/interfaces';
import { CovidService } from '../../services/covid.service';

@Component({
  selector: 'app-info-header',
  templateUrl: './info-header.component.html',
  styleUrls: ['./info-header.component.css']
})
export class InfoHeaderComponent {

  constructor(public covid: CovidService) {  }

  @Input() input: InfoHeader;

}
