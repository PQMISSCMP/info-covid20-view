import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { CovidService } from '../../services/covid.service';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ActivatedRoute } from '@angular/router';
import { ResponseDataChart, CasosResume } from '../../model/interfaces';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico-lineal.component.html',
  styleUrls: ['./grafico-lineal.component.css']
})
export class GraficoLinealComponent implements OnChanges {

  @Input() dataResume: CasosResume[];
  sucesionContagiados: number[];
  sucesionDecesos: number[];
  actualizacionesDataLabels: string[];

  ChartData = [{data: []}] as ChartDataSets[];

  ChartLabels: Label[] = [];

  constructor(private graficoLinealService: CovidService, private route: ActivatedRoute, private spinner: NgxSpinnerService) {
    route.params.subscribe(async (p) => {
      this.spinner.show();
      console.log(p.pais);

      const data = await this.getDataChart(p.pais);
      console.log(data);

      window.scroll(0, 0);
      this.spinner.hide();
      this.ChartData = [
        // { data: [...new Set(data.Contagiados)], label: 'Contagiados' },
        { data: [...new Set(data.Decesos)], label: 'Decesos' }
      ];


      this.ChartLabels = [...new Set(data.Actualizaciones)];

    });
  }

  ChartOptions: ChartOptions = {
    responsive: true
  };

  chartColors: Color[] = [
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    }
  ];


  ChartLegend = true;
  ChartPlugins = [];
  ChartType = 'bar';

  cContagiadosPais: any[];
  ngOnChanges() {
    if (typeof this.dataResume !== 'undefined') {
      this.dataResume.map(report => {
        this.cContagiadosPais.push(report.totalContagiados);
      });
    }

  }

  async getDataChart(pais: string): Promise<ResponseDataChart> {

    const secContagiados: number[] = [];
    const secDecesos: number[] = [];
    const secActualizaciones: string[] = [];
    try {
      const actualizacionesCountry = await this.graficoLinealService.getHistoryByCountry(pais);
      actualizacionesCountry.map(act => {
        secContagiados.push(act.totalContagiados);
        secDecesos.push(act.
          totalDecesos);
        secActualizaciones.push(new Date(act.fechUltActualizacion).toLocaleDateString());
      });

      const response: ResponseDataChart = {
          Actualizaciones: secActualizaciones,
          Contagiados: secContagiados,
          Decesos: secDecesos
      };

      return response;

    } catch (error) {
        alert(error.message);
    }


  }

}
