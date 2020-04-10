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
  ChartType = 'bar';

  labelsPorcentages: any[] = [];

  ChartOptions = {
    responsive: true
  };

  cPorcentagesPais: any[] = [];
  ChartDataPorcentagesDow = [{data: []}] as ChartDataSets[];
  ChartLabelsPorcentagesDow: Label[] = [];

  constructor() { }

  chartColorsPorcentDow: Color[] = [
    {
      backgroundColor: [
        'rgb(80, 241, 180)',
        'rgb(80, 221, 180)',
        'rgb(80, 201, 180)',
        'rgb(80, 181, 180)',
        'rgb(80, 161, 180)',
        'rgb(80, 141, 180)',
        'rgb(80, 121, 180)',
        'rgb(80, 101, 180)',
        'rgb(80, 81, 180)',
        'rgb(80, 61, 180)',
      ],
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 1,
    }
  ];


  ngOnChanges() {

    if (typeof this.dataPorcentagesDown !== 'undefined') {

        const Porcentages = this.dataPorcentagesDown.sort((a, b) => a.porcent - b.porcent).slice(0, 8);
        Porcentages.reverse();
        Porcentages.map(report => {
          this.cPorcentagesPais.push(report.porcent);
          this.labelsPorcentages.push(report.lugar);
        });

        this.ChartDataPorcentagesDow = [{ data: this.cPorcentagesPais, label: 'Best % over 10,000 confirmed', barPercentage: 0.5}];
        this.ChartLabelsPorcentagesDow = this.labelsPorcentages;

    }

  }


}
