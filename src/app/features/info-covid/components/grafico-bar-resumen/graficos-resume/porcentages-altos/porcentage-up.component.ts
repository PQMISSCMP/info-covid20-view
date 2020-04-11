import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { CasosResume } from '../../../../model/interfaces';

@Component({
  selector: 'app-grafico-porcentage-up',
  templateUrl: './porcentage-up.component.html',
  styleUrls: ['./porcentage-up.component.css']
})
export class GraficoPorcentageUpComponent implements OnChanges {

  @Input() dataPorcentagesUp: CasosResume[];

  ChartLegend = true;
  ChartPlugins = [];
  ChartType = 'line';

  labelsPorcentages: any[] = [];

  ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        display: true
      }],
      yAxes: [{
        display: true
      }],
    }
  };

  cPorcentagesPais: any[] = [];
  ChartDataPorcentages = [{data: [], fill: false}] as ChartDataSets[];
  ChartLabelsPorcentages: Label[] = [];

  constructor() { }

  chartColorsPorcent: Color[] = [
    {
      backgroundColor: [
        // 'rgb(50, 241, 100)',
        // 'rgb(50, 221, 100)',
        // 'rgb(50, 201, 100)',
        // 'rgb(50, 181, 100)',
        // 'rgb(50, 161, 100)',
        // 'rgb(50, 141, 100)',
        // 'rgb(50, 121, 100)',
        // 'rgb(50, 101, 100)',
        // 'rgb(50, 81, 100)',
        'rgb(255, 128, 0)',
        // 'rgba(200, 99, 132, .7)'
      ],
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    }
  ];


  ngOnChanges() {

    // sort((a, b) => b.porcent - a.porcent).slice(0, 10)

    if (typeof this.dataPorcentagesUp !== 'undefined') {
        const Porcentages = this.dataPorcentagesUp.sort((a, b) => b.porcent - a.porcent).slice(0, 8);

        Porcentages.reverse();
        Porcentages.map(report => {
          this.cPorcentagesPais.push(report.porcent);
          this.labelsPorcentages.push(report.lugar);
        });
        this.ChartDataPorcentages = [{ data: this.cPorcentagesPais, label: 'Worst % over 10,000 confirmed', barPercentage: 0.5}];
        this.ChartLabelsPorcentages = this.labelsPorcentages;

    }

  }


}
