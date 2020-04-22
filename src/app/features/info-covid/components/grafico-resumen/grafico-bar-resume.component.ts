import { Component, Input, OnChanges } from '@angular/core';
import { CasosResume } from '../../model/interfaces';
import { CovidService } from '../../services/covid.service';

@Component({
  selector: 'app-grafico-bar-resume',
  templateUrl: './grafico-bar-resume.component.html'
})
export class GraficoBarResumeComponent implements OnChanges {

  @Input() dataResume: CasosResume[];
  contagiados: CasosResume[] = [];
  decesos: CasosResume[] = [];
  porcentagesUp: CasosResume[] = [];
  porcentagesDown: CasosResume[] = [];
  muestraResumeLateral: boolean;

  constructor(private covidService: CovidService) { }

  ngOnChanges() {

    this.covidService.country.subscribe(data => {
        const nRegFilter = data.country === '/' ? 10000 : 1000;
        this.muestraResumeLateral = data.country === '/' ? false : true;
        if (this.dataResume) {
          this.contagiados = this.dataResume.sort((a, b) => b.totalContagiados - a.totalContagiados).slice(0, 10);
          this.decesos = this.dataResume.sort((a, b) => b.totalDecesos - a.totalDecesos).slice(0, 10);
          this.porcentagesUp = this.dataResume.filter(x => x.totalContagiados > nRegFilter).sort((a, b) => b.porcent - a.porcent).slice(0, 10).reverse();
          this.porcentagesDown = this.dataResume.filter(x => x.totalContagiados > nRegFilter).sort((a, b) => a.porcent - b.porcent).slice(0, 10).reverse();
        }

    });


  }


}
