import { Component, Input, OnChanges } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { CasosResume } from '../../../../model/interfaces';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-grafico-contagiados',
  templateUrl: './contagiados.component.html',
  styleUrls: ['./contagiados.component.css']
})
export class GraficoContagiadosComponent implements OnChanges {
  constructor(private spinner: NgxSpinnerService) { }

  @Input() dataContagiados: CasosResume[];

  ChartLegend = true;
  ChartPlugins = [];
  ChartType = 'bar';
  labelsPaisContagiados: any[] = [];

  ChartOptions = {
    responsive: true,
  };

  cContagiadosPais: any[] = [];
  ChartDataContagiados = [{data: []}] as ChartDataSets[];
  ChartLabelsContagiados: Label[] = [];

  chartColorsContagiados: Color[] = [
    {
      backgroundColor: [
        'rgb(136, 138, 144)',
        'rgb(146, 138, 144)',
        'rgb(156, 138, 144)',
        'rgb(166, 138, 144)',
        'rgb(176, 138, 144)',
        'rgb(186, 138, 144)',
        'rgb(196, 138, 144)',
        'rgb(206, 138, 144)',
        'rgb(216, 138, 144)',
        'rgb(226, 138, 144)',
      ],
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 1,
    }
  ];

          // 'rgb(155, 250, 180)',
          // 'rgb(155, 240, 180)',
          // 'rgb(155, 230, 180)',
          // 'rgb(155, 220, 180)',
          // 'rgb(155, 210, 180)',
          // 'rgb(155, 200, 180)',
          // 'rgb(155, 190, 180)',
          // 'rgb(155, 180, 180)',
          // 'rgb(155, 170, 180)',
          // 'rgb(155, 160, 180)',
          // 'rgb(155, 241, 180)',
          // 'rgb(155, 221, 180)',
          // 'rgb(155, 201, 180)',
          // 'rgb(155, 181, 180)',
          // 'rgb(155, 161, 180)',
          // 'rgb(155, 141, 180)',
          // 'rgb(155, 121, 180)',
          // 'rgb(155, 101, 180)',
          // 'rgb(155, 81, 180)',
          // 'rgb(155, 61, 180)',
  
  ngOnChanges() {

    if (typeof this.dataContagiados !== 'undefined') {

        this.cContagiadosPais = [];
        this.labelsPaisContagiados = [];

        this.spinner.show();
        const Contagiados = this.dataContagiados.sort((a, b) => b.totalContagiados - a.totalContagiados).slice(0, 10);

        Contagiados.reverse();

        Contagiados.map(report => {
          this.cContagiadosPais.push(report.totalContagiados);
          this.labelsPaisContagiados.push(report.lugar);
        });

        this.ChartDataContagiados = [{data: this.cContagiadosPais, label: 'Nº confirmado por país', barPercentage: 0.5}];
        this.ChartLabelsContagiados = this.labelsPaisContagiados;

        this.spinner.hide();

    }

  }


}
