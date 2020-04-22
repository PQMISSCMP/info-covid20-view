import { Component, Input, OnChanges } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { CasosResume } from '../../../../model/interfaces';

@Component({
  selector: 'app-grafico-decesos',
  templateUrl: './decesos.component.html',
  styleUrls: ['./decesos.component.css']
})
export class GraficoDecesosComponent implements OnChanges {
  constructor() { }

  @Input() dataDecesos: CasosResume[];

  ChartLegend = true;
  ChartPlugins = [];
  ChartType = 'bar';
  labelsPaisDecesos: any[] = [];

  ChartOptions = {
    responsive: true
  };

  cDecesosPais: any[] = [];
  ChartDataDecesos = [{data: []}] as ChartDataSets[];
  ChartLabelsDecesos: Label[] = [];

  chartColorsDecesos: Color[] = [
    {
      backgroundColor: [
        // 'rgb(255, 255, 180)',
        // 'rgb(255, 235, 180)',
        // 'rgb(255, 215, 180)',
        // 'rgb(255, 195, 180)',
        // 'rgb(255, 175, 180)',
        // 'rgb(255, 155, 180)',
        // 'rgb(255, 135, 180)',
        // 'rgb(255, 115, 180)',
        // 'rgb(255, 95, 180)',
        // 'rgb(255, 75, 180)',
        // 'rgb(255, 55, 180)',
        'rgb(98, 106, 136)',
        'rgb(88, 110, 136)',
        'rgb(78, 120, 136)',
        'rgb(68, 130, 136)',
        'rgb(58, 140, 136)',
        'rgb(48, 150, 136)',
        'rgb(38, 160, 136)',
        'rgb(28, 170, 136)',
        'rgb(18, 180, 136)',
        'rgb(8, 190, 136)',
      ],
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 1,
    }
  ];


  ngOnChanges() {

    if (typeof this.dataDecesos !== 'undefined') {
        const Decesos = this.dataDecesos.sort((a, b) => b.totalDecesos - a.totalDecesos).slice(0, 10);

        this.labelsPaisDecesos = [];
        this.ChartDataDecesos = [];
        this.cDecesosPais = [];

        Decesos.reverse();
        Decesos.map(report => {
          this.cDecesosPais.push(report.totalDecesos);
          this.labelsPaisDecesos.push(report.lugar);
        });

        this.ChartDataDecesos = [{ data: this.cDecesosPais, label: 'Nº decesos por país', barPercentage: 0.5}];
        this.ChartLabelsDecesos = this.labelsPaisDecesos;

    }

  }


}
