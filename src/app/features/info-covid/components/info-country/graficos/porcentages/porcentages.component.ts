import { Component, Input, OnChanges } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { PercentageModel } from '../../../../model/interfaces';

@Component({
  selector: 'app-country-porcentages',
  templateUrl: './porcentages.component.html',
  styleUrls: ['./porcentages.component.css']
})
export class CountryPercentagesComponent implements OnChanges {

  @Input() dataPorcentages: PercentageModel[];

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

    if (typeof this.dataPorcentages !== 'undefined') {
        this.cPorcentagesPais = this.dataPorcentages.map(({percent}) => percent.toString().split('.')[1] === '0' ? Math.floor(percent) : percent );
        this.ChartDataPorcentages = [{ data: this.cPorcentagesPais, label: 'Evolución tasa de decesos' }];
        this.ChartLabelsPorcentages = this.cPorcentagesPais;

    }

  }


}
