import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CovidService } from '../../services/covid.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CasosResume, InfoHeader, InputSelectCountry } from '../../model/interfaces';
import { Observable } from 'rxjs';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ThemePalette } from '@angular/material/core';


@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;

  public dataInputHeader: InfoHeader;
  public countrySelted: boolean;
  public inputCountry = {} as InputSelectCountry;
  actualizacionesResume: CasosResume[] = [];
  actualizacionesResumeBck: CasosResume[] = [];
  @Output() proveerGraficos = new EventEmitter<CasosResume[]>();

  constructor(public covidService: CovidService, private spinner: NgxSpinnerService ) { }

  async ngOnInit() {

    try {
      setTimeout(_ => { this.spinner.show(); }, 10);
      const list = await this.covidService.getHistoryList();

      if (typeof list === 'undefined') { throw new Error('Error al obtener los datos'); }
      list.map(x => {
        const hrs = Math.floor(Math.abs(new Date().getTime() - new Date(x.fechUltActualizacion).getTime()) / 36e5);
        const item: CasosResume = {
          lugar: x.lugar.trim(),
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

      this.dataInputHeader = this.getInfoHeader(list, 'Information of the COVID-19 virus in the world');

      this.covidService.country.subscribe(async data => {
          let curvaCont: number[] = [];
          if ( data.country !== '/') {
            curvaCont = (await this.covidService.getCurvaContagios(data.country))[0].valores;
            // console.log('curvaCont', curvaCont);

          }

          this.countrySelted = data.flagSelected;
          this.cargaInfoCountry(data.country, curvaCont.filter(num => num > 0));
      });

      setTimeout(_ => { this.spinner.hide(); }, 10);
      this.onProveerGraficos();
    } catch (error) {
      console.log(error);
      this.ngOnInit();
      // alert(error.message);
    }
  }

  onProveerGraficos() {
    this.proveerGraficos.emit(this.actualizacionesResume);
  }



  cargaInfoCountry(country: string, curvaContagios: number[]) {

    if (country === '/') {
        this.actualizacionesResume = this.actualizacionesResumeBck;
        this.dataInputHeader = this.getInfoHeader(this.actualizacionesResumeBck, this.covidService.TITULO_DEFAULT);
    } else {

        this.dataInputHeader = this.getInfoHeader(this.actualizacionesResumeBck, country);
        let continente: string[] = [];
        const { sudamerica, asia, europa, norteAmerica, oceania, africa } = this.covidService;

        if (sudamerica.some(pais => pais === country)) {
          continente = sudamerica;
        } else if (asia.some(pais => pais === country)) {
          continente = asia;
        } else if (europa.some(pais => pais === country)) {
          continente = europa;
        } else if (norteAmerica.some(pais => pais === country)) {
          continente = norteAmerica;
        } else if (oceania.some(pais => pais === country)) {
          continente = oceania;
        } else if (africa.some(pais => pais === country)) {
          continente = africa;
        }

        const percentages = this.actualizacionesResumeBck.find(pais => pais.lugar === country).percentages;
        const resumeRegion = this.actualizacionesResumeBck.filter(el => continente.includes(el.lugar));
        this.actualizacionesResume = resumeRegion;
        this.inputCountry = { dataSubRegion: resumeRegion, percentages, curvaContagios};

    }

    this.onProveerGraficos();
  }

  getInfoHeader(lista: CasosResume[], titulo: string): InfoHeader {

    let dead: number;
    let contg: number;
    let perc: string;

    if (titulo === this.covidService.TITULO_DEFAULT) {
      dead = lista.reduce((acc, val) => acc + val.totalDecesos , 0);
      contg = lista.reduce((acc, val) => acc + val.totalContagiados , 0);
      perc = ((dead / contg) * 100).toFixed(1);
    } else {
      contg = lista.find(pais => pais.lugar === titulo).totalContagiados;
      dead = lista.find(pais => pais.lugar === titulo).totalDecesos;
      // contg = lista.find(pais => pais.lugar.replace(/ /g, '') === titulo).totalContagiados;
      // dead = lista.find(pais => pais.lugar.replace(/ /g, '') === titulo).totalDecesos;
      perc = ((dead / contg) * 100).toFixed(1);
    }

    return {totalDead: dead,
            totalInfected: contg,
            percentage: perc,
            relation: (contg / dead),
            titulo
    } as InfoHeader;

  }

}


