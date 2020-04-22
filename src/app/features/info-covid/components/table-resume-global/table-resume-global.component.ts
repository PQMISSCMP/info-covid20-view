import { Component, Input, Output } from '@angular/core';
import { CasosResume } from '../../model/interfaces';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { CovidService } from '../../services/covid.service';


@Component({
  selector: 'app-table-resume-global',
  templateUrl: './table-resume-global.component.html',
  styleUrls: ['./table-resume-global.component.css']
})
export class TableResumeComponent {

  @Output() clickPais = new EventEmitter<string>();
  @Input() actualizacionesResume: CasosResume;

  constructor(router: Router, private covidService: CovidService) {
    router.events.subscribe(evento => {
      if (evento instanceof NavigationEnd) {
        const stringSent = evento.url === '/' ? '/' : evento.url.split('/')[2].replace(/%20/g, ' ').trim();
        window.scroll(0, 0);
        this.covidService.updatedCountrySelection({flagSelected: stringSent === '/' ?  false : true, country: stringSent});
      }
    });

  }

  onSort(event) { }

  onClickPais(cou: string) {
    this.clickPais.emit(cou);
  }


}
