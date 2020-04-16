import { Component, Input, OnChanges } from '@angular/core';
import { CasosResume } from '../../model/interfaces';

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

  constructor() { }

  ngOnChanges() {

    if (this.dataResume) {
      this.contagiados = this.dataResume.sort((a, b) => b.totalContagiados - a.totalContagiados).slice(0, 10);
      this.decesos = this.dataResume.sort((a, b) => b.totalDecesos - a.totalDecesos).slice(0, 10);
      this.porcentagesUp = this.dataResume.filter(x => x.totalContagiados > 10000).sort((a, b) => b.porcent - a.porcent).slice(0, 10).reverse();
      this.porcentagesDown = this.dataResume.filter(x => x.totalContagiados > 10000).sort((a, b) => a.porcent - b.porcent).slice(0, 10).reverse();
    
    }

  }


}
