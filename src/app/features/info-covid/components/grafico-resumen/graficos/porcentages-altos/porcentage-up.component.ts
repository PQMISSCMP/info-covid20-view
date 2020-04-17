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

  labelsPorcentages: string[] = [];

  ChartOptions = {
    responsive: true,
    elements: { line: { fill: false } },
    legend: {
      onClick: (event, legendItem) => {}
    }
  };

  cPorcentagesPais: number[] = [];
  ChartDataPorcentages = [{data: []}] as ChartDataSets[];
  ChartLabelsPorcentages: Label[] = [];

  constructor() { }

  chartColorsPorcent: Color[] = [
    {
      backgroundColor: ['rgb(255, 128, 0)'],
      borderColor: 'rgba(255, 128, 0)',
      borderWidth: 2,
    }
  ];


  ngOnChanges() {

    if (typeof this.dataPorcentagesUp !== 'undefined') {
        // console.log(this.dataPorcentagesUp);

        this.cPorcentagesPais = [];
        this.labelsPorcentages = [];
        this.ChartDataPorcentages = [];

        const Porcentages = this.dataPorcentagesUp;
        this.cPorcentagesPais = Porcentages.map(({porcent}) => porcent);
        this.labelsPorcentages = Porcentages.map(({lugar}) => lugar);

        this.ChartDataPorcentages = [{ data: this.cPorcentagesPais, label: 'Worst % over threshold confirmed', barPercentage: 0.5}];
        this.ChartLabelsPorcentages = this.labelsPorcentages;

    }

  }


}
