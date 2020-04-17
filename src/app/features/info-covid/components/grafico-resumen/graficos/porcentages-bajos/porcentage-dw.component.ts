import { Component, Input, OnChanges } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { CasosResume } from '../../../../model/interfaces';

@Component({
  selector: 'app-grafico-porcentage-dw',
  templateUrl: './porcentage-dw.component.html',
  styleUrls: ['./porcentage-dw.component.css']
})
export class GraficoPorcentageDownComponent implements OnChanges {

  @Input() dataPorcentagesDown: CasosResume[];

  ChartLegend = true;
  ChartPlugins = [];
  ChartType = 'line';

  labelsPorcentages: any[] = [];

  ChartOptions = {
    responsive: true,
    elements: { line: { fill: false } },
    legend: {
      onClick: (event, legendItem) => {}
    }
  };

  cPorcentagesPais: any[] = [];
  ChartDataPorcentagesDow = [{data: []}] as ChartDataSets[];
  ChartLabelsPorcentagesDow: Label[] = [];

  constructor() { }

  chartColorsPorcentDow: Color[] = [
    {
      backgroundColor: [
        'rgb(80, 241, 180)',
        // 'rgb(80, 221, 180)',
        // 'rgb(80, 201, 180)',
        // 'rgb(80, 181, 180)',
        // 'rgb(80, 161, 180)',
        // 'rgb(80, 141, 180)',
        // 'rgb(80, 121, 180)',
        // 'rgb(80, 101, 180)',
        // 'rgb(80, 81, 180)',
        // 'rgb(80, 61, 180)',
      ],
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    }
  ];


  ngOnChanges() {

      if (this.dataPorcentagesDown) {

          this.ChartDataPorcentagesDow = [];
          this.labelsPorcentages = [];
          this.cPorcentagesPais = [];

          const Porcentages = this.dataPorcentagesDown;

          this.cPorcentagesPais = Porcentages.map(({porcent}) => porcent);
          this.labelsPorcentages = Porcentages.map(({lugar}) => lugar);

          this.ChartDataPorcentagesDow = [{ data: this.cPorcentagesPais, label: 'Best % over threshold confirmed', barPercentage: 0.5}];
          this.ChartLabelsPorcentagesDow = this.labelsPorcentages;

      }

  }


}
