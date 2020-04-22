import { Component, Input, OnChanges } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-curva-decesos',
  templateUrl: './curva-decesos.component.html',
  styleUrls: ['./curva-decesos.component.css']
})
export class CurvaDecesosComponent implements OnChanges {

  @Input() dataCurvaDecesos: any[];

  ChartLegend = true;
  ChartPlugins = [];
  ChartType = 'line';

  labelsPorcentages: any[] = [];

  ChartOptions = {
    responsive: true,
    elements: { line: { fill: false } },
    legend: {
      onClick: (event, legendItem) => {}
    },
    tooltips: {
      callbacks: {
         label: (tooltipItem) => {
                return tooltipItem.yLabel;
         }
      }
    }
  };

  cPorcentagesPais: any[] = [];
  ChartDataPorcentages = [{data: []}] as ChartDataSets[];
  ChartLabelsPorcentages: Label[] = [];

  constructor() { }

  chartColorsPorcent: Color[] = [
    {
      backgroundColor: [
        'rgb(80, 241, 180)',
        'rgb(80, 141, 180)'
      ],
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    }
  ];


  ngOnChanges() {
    if (typeof this.dataCurvaDecesos !== 'undefined') {
        this.ChartDataPorcentages = [{ data: this.dataCurvaDecesos, label: 'Curva de decesos ' }];
        this.ChartLabelsPorcentages = this.dataCurvaDecesos;

    }

  }


}
