import { Component, Input, Output, OnChanges } from '@angular/core';
import { CasosResume } from '../../../model/interfaces';
import { Router, NavigationEnd } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { CovidService } from '../../../services/covid.service';

@Component({
  selector: 'app-table-resume-region',
  templateUrl: './table-resume-region.component.html',
  styleUrls: ['./table-resume-region.component.css']
})
export class TableResumeRegionComponent {

  @Output() clickPais = new EventEmitter<string>();
  @Input() actualizacionesResume: CasosResume[];

  public page = 1;
  public pageSize = 10;

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
