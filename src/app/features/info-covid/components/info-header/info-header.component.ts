import { Component, Input } from '@angular/core';
import { InfoHeader } from '../../model/interfaces';

@Component({
  selector: 'app-info-header',
  templateUrl: './info-header.component.html',
  styleUrls: ['./info-header.component.css']
})
export class InfoHeaderComponent {

  @Input() input: InfoHeader;

}
