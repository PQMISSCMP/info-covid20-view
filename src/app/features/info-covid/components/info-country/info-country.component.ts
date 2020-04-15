import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { InputSelectCountry } from '../../model/interfaces';

@Component({
  selector: 'app-info-country',
  templateUrl: './info-country.component.html',
  styleUrls: ['./info-country.component.css']
})
export class InfoCountryComponent {

  @Input() inputCountry: InputSelectCountry;
  constructor() { }


}
