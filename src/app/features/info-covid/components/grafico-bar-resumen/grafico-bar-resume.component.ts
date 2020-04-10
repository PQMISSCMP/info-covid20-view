import { Component, Input, OnChanges } from '@angular/core';
import { CasosResume } from '../../model/interfaces';

@Component({
  selector: 'app-grafico-bar-resume',
  templateUrl: './grafico-bar-resume.component.html'
})
export class GraficoBarResumeComponent implements OnChanges {

  @Input() dataResume: CasosResume[];
  contagiados: any[] = [];
  decesos: any[] = [];
  porcentagesUp: any[] = [];
  porcentagesDown: any[] = [];

  constructor() { }

  ngOnChanges() {

    if (typeof this.dataResume !== 'undefined') {
      this.contagiados = this.dataResume.sort((a, b) => b.totalContagiados - a.totalContagiados).slice(0, 10);
      this.decesos = this.dataResume.sort((a, b) => b.totalDecesos - a.totalDecesos).slice(0, 10);
      this.porcentagesUp = this.dataResume.filter(x => x.totalContagiados > 10000);
      this.porcentagesDown = this.dataResume.filter(x => x.totalContagiados > 10000);
    }

  }


}
