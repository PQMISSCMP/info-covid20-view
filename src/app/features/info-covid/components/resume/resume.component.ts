import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CovidService } from '../../services/covid.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CasosResume, InfoHeader, InputSelectCountry } from '../../model/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {

  public dataInputHeader: InfoHeader;
  public countrySelted: boolean;
  public inputCountry = {} as InputSelectCountry;
  actualizacionesResume: CasosResume[] = [];
  actualizacionesResumeBck: CasosResume[] = [];
  @Output() proveerGraficos = new EventEmitter<CasosResume[]>();

  constructor(public covidService: CovidService, private spinner: NgxSpinnerService) { }

  async ngOnInit() {

    try {
      setTimeout(_ => { this.spinner.show(); }, 10);
      const list = await this.covidService.getHistoryList();

      if (typeof list === 'undefined') { throw new Error('Error al obtener los datos'); }
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
          horasDesdeUltActualiza: this.covidService.horasToTiempoGlosa(hrs),
          percentages: x.percentages
        };
        this.actualizacionesResume.push(item);
      });

      this.actualizacionesResume = this.actualizacionesResume.sort((a, b) => b.totalContagiados - a.totalContagiados);
      this.actualizacionesResumeBck = this.actualizacionesResume;

      // const dead = list.reduce((acc, val) => acc + val.totalDecesos , 0);
      // const contg = list.reduce((acc, val) => acc + val.totalContagiados , 0);
      // const perc = ((dead / contg) * 100).toFixed(1);

      // const dataInp: InfoHeader =  {
      //   totalDead: dead,
      //   totalInfected: contg,
      //   percentage: perc,
      //   relation: (contg / dead),
      //   titulo: 'Information of the COVID-19 virus in the world'
      // };
      this.dataInputHeader = this.getInfoHeader(list, 'Information of the COVID-19 virus in the world');

      this.covidService.country.subscribe(data => {
        this.countrySelted = data.flagSelected;
        console.log('suscribe data: ', data);
        // if (!data.flagSelected) {
        // this.cargaInfoCountry(data.country);
        //}

      });

      setTimeout(_ => { this.spinner.hide(); }, 10);
      this.onProveerGraficos();
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  }

  onProveerGraficos() {
    this.proveerGraficos.emit(this.actualizacionesResume);
  }

  getInfoHeader(lista: CasosResume[], titulo: string): InfoHeader {
    const dead = lista.reduce((acc, val) => acc + val.totalDecesos , 0);
    const contg = lista.reduce((acc, val) => acc + val.totalContagiados , 0);
    const perc = ((dead / contg) * 100).toFixed(1);
    return {
      totalDead: dead,
      totalInfected: contg,
      percentage: perc,
      relation: (contg / dead),
      titulo
    } as InfoHeader;
  }

  cargaInfoCountry(dataOutput: string) {
    console.log("dataOutput: ", dataOutput);

    if (dataOutput === '/') {
      this.actualizacionesResume = this.actualizacionesResumeBck;
      this.dataInputHeader = this.getInfoHeader(this.actualizacionesResumeBck, 'Information of the COVID-19 virus in the world');
      return;
    } else {
      this.dataInputHeader = this.getInfoHeader(this.actualizacionesResumeBck, dataOutput);
      this.covidService.updatedCountrySelection({flagSelected: true, country: dataOutput});

      const { sudamerica } = this.covidService;
      const percentages = this.actualizacionesResume.find(pais => pais.lugar.replace(/ /g, '') === dataOutput).percentages;
      const resumeRegion = this.actualizacionesResume.filter(el => sudamerica.includes(el.lugar));

      this.actualizacionesResume = resumeRegion;

      this.inputCountry = {
        dataSubRegion: resumeRegion,
        percentages
      };


    }

    this.onProveerGraficos();
    // if (typeof dataOutput !== 'undefined') {
    // }

    // const contg = this.actualizacionesResume.find(pais => pais.lugar.replace(/ /g, '') === dataOutput).totalContagiados;
    // const deads = this.actualizacionesResume.find(pais => pais.lugar.replace(/ /g, '') === dataOutput).totalDecesos;
    // const perc = ((deads / contg) * 100).toFixed(1);

    // const dataInp: InfoHeader = {
    //   totalInfected: contg,
    //   totalDead: deads,
    //   percentage: perc,
    //   relation: Math.floor(contg / deads),
    //   titulo: dataOutput
    // };
    // this.dataInput = dataInp;


  }

}
