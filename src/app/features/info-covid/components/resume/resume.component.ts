import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { CovidService } from '../../services/covid.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CasosResume } from '../../model/interfaces';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {
  constructor(private covidService: CovidService, private spinner: NgxSpinnerService) { }
  actualizacionesResume: CasosResume[] = [];

  @Output() propagar = new EventEmitter<CasosResume[]>();

  async ngOnInit() {
    this.spinner.show();
    const list = await this.covidService.getHistoryList();
    list.map(x => {
      const hrs = Math.floor(Math.abs(new Date().getTime() - new Date(x.fechUltActualizacion).getTime()) / 36e5);
      const item: CasosResume = {
        lugar: x.lugar,
        totalContagiados: x.totalContagiados,
        totalDecesos: x.totalDecesos,
        porcent: x.porcent,
        ultContagiados: x.ultContagiados,
        ultDecesos: x.ultDecesos,
        tiempoDesdeUltAct: x.tiempoDesdeUltAct,
        fechUltActualizacion: x.fechUltActualizacion,
        nroContagiadosAnt: x.nroContagiadosAnt,
        nroDecesosAnt: x.nroDecesosAnt,
        statusContagiados: x.statusContagiados,
        statusDecesos: x.statusDecesos,
        horasDesdeUltActualiza: this.covidService.horasToTiempoGlosa(hrs)
      };
      this.actualizacionesResume.push(item);
    });

    this.actualizacionesResume = this.actualizacionesResume.sort((a, b) => b.totalContagiados - a.totalContagiados);

    this.spinner.hide();
    this.onPropagar();
  }

  onPropagar() {
    this.propagar.emit(this.actualizacionesResume);
  }

  callChart(pais: string) {
    console.log(pais);
  }

}
