import { Component, Input, Output } from '@angular/core';
import { CasosResume } from '../../model/interfaces';
import { Router, NavigationEnd } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { CovidService } from '../../services/covid.service';


@Component({
  selector: 'app-table-resume',
  templateUrl: './table-resume.component.html',
  styleUrls: ['./table-resume.component.css']
})
export class TableResumeComponent {

  @Output() clickPais = new EventEmitter<string>();
  @Input() actualizacionesResume: CasosResume;

  constructor(router: Router, private covidService: CovidService) {
    router.events.subscribe(evento => {
      if (evento instanceof NavigationEnd) {
        window.scroll(0, 0);
        const stringSent = evento.url === '/' ? '/' : evento.url.split('/')[2].replace(/%20/g, '').trim();
        // console.log(stringSent);
        this.covidService.updatedCountrySelection({flagSelected: false, country: stringSent});
        this.onClickPais(stringSent);
      }

    });

  }

  onSort(event) { }

  onClickPais(cou: string) {
    this.clickPais.emit(cou);
  }


}
