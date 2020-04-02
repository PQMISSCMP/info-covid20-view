import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { CovidService } from '../../services/covid.service';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ActivatedRoute } from '@angular/router';
import { ResponseDataChart, CasosResume } from '../../model/interfaces';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-grafico-bar-resume',
  templateUrl: './grafico-bar-resume.component.html',
  styleUrls: ['./grafico-bar-resume.component.css']
})
export class GraficoBarResumeComponent implements OnChanges {

// https://mdbootstrap.com/support/angular/how-to-show-values-on-chart-bars/

  @Input() dataResume: CasosResume[];
  ChartPlugins = [];
  ChartType = 'bar';
  labelsPaisContagiados: any[] = [];
  labelsPaisDecesos: any[] = [];
  ChartOptions: ChartOptions = { responsive: true };

  cContagiadosPais: any[] = [];
  ChartDataContagiados = [{data: []}] as ChartDataSets[];
  ChartLabelsContagiados: Label[] = [];

  ChartLegend = true;
  cDecesosPais: any[] = [];
  ChartDataDecesos = [{data: []}] as ChartDataSets[];
  ChartLabelsDecesos: Label[] = [];

  constructor(private route: ActivatedRoute, private spinner: NgxSpinnerService) {
    // route.params.subscribe(async (p) => {

    // });
  }



  chartColorsContagiados: Color[] = [
    {
      backgroundColor: [
        'rgb(255, 55, 180)',
        'rgb(255, 75, 180)',
        'rgb(255, 95, 180)',
        'rgb(255, 115, 180)',
        'rgb(255, 135, 180)',
        'rgb(255, 155, 180)',
        'rgb(255, 175, 180)',
        'rgb(255, 195, 180)',
        'rgb(255, 215, 180)',
        'rgb(255, 235, 180)',
        'rgb(255, 255, 180)',        
      ],
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 1,
    }
  ];

  chartColorsDecesos: Color[] = [
    {
      backgroundColor: [
        'rgb(155, 61, 180)',
        'rgb(155, 81, 180)',
        'rgb(155, 101, 180)',
        'rgb(155, 121, 180)',
        'rgb(155, 141, 180)',
        'rgb(155, 161, 180)',
        'rgb(155, 181, 180)',
        'rgb(155, 201, 180)',
        'rgb(155, 221, 180)',
        'rgb(155, 241, 180)',
      ],
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 1,
    }
  ];


  ngOnChanges() {

    if (typeof this.dataResume !== 'undefined') {
        this.spinner.show();
        const Contagiados = this.dataResume.sort((a, b) => b.totalContagiados - a.totalContagiados).slice(0, 10);
        const Decesos = this.dataResume.sort((a, b) => b.totalDecesos - a.totalDecesos).slice(0, 10);

        Contagiados.map(report => {
          this.cContagiadosPais.push(report.totalContagiados);
          this.labelsPaisContagiados.push(report.lugar);
        });

        Decesos.map(report => {
          this.cDecesosPais.push(report.totalDecesos);
          this.labelsPaisDecesos.push(report.lugar);
        });

        this.ChartDataContagiados = [{data: this.cContagiadosPais, label: 'Infected'}];
        this.ChartDataDecesos = [{ data: this.cDecesosPais, label: 'Dead'}];

        this.ChartLabelsContagiados = this.labelsPaisContagiados;
        this.ChartLabelsDecesos = this.labelsPaisDecesos;
        this.spinner.hide();

    }

  }


}
