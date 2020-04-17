import { Component, Input, OnChanges } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-curva-contagios',
  templateUrl: './curva-contagios.component.html',
  styleUrls: ['./curva-contagios.component.css']
})
export class CurvaContagiosComponent implements OnChanges {

  @Input() dataCurvaContagios: any[];

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
    console.log('this.dataCurvaContagios: ', this.dataCurvaContagios);

    if (typeof this.dataCurvaContagios !== 'undefined') {
        // this.cPorcentagesPais = this.dataCurvaContagios.map(({percent}) => percent.toString().split('.')[1] === '0' ? Math.floor(percent) : percent );
        this.ChartDataPorcentages = [{ data: this.dataCurvaContagios, label: 'Curva de contagios' }];
        this.ChartLabelsPorcentages = this.dataCurvaContagios;

    }

  }


}
