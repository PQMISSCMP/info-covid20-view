import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';
import { NgxSpinnerModule } from 'ngx-spinner';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


import { CovidService } from './features/info-covid/services/covid.service';
import { CountryService } from './features/info-covid/services/table.services';

import { AppComponent } from './app.component';
import { GlobalMapComponent } from './features/info-covid/components/global-map/global-map.component';
import { ResumeComponent } from './features/info-covid/components/resume/resume.component';
import { GraficoBarResumeComponent } from './features/info-covid/components/grafico-resumen/grafico-bar-resume.component';
import { DecimalPipe } from '@angular/common';
import { NgbdSortableHeader } from './features/info-covid/directives/sortable.directive';

import { InfoHeaderComponent } from './features/info-covid/components/info-header/info-header.component';
import { TableResumeComponent } from './features/info-covid/components/table-resume/table-resume.component';
import { InfoCountryComponent } from './features/info-covid/components/info-country/info-country.component';
import { CountryPercentagesComponent } from './features/info-covid/components/info-country/graficos/porcentages/porcentages.component';
import { GraficoContagiadosComponent } from './features/info-covid/components/grafico-resumen/graficos/contagiados/contagiados.component';
import { GraficoPorcentageDownComponent } from './features/info-covid/components/grafico-resumen/graficos/porcentages-bajos/porcentage-dw.component';
import { GraficoDecesosComponent } from './features/info-covid/components/grafico-resumen/graficos/decesos/decesos.component';
import { GraficoPorcentageUpComponent } from './features/info-covid/components/grafico-resumen/graficos/porcentages-altos/porcentage-up.component';
import { CurvaContagiosComponent } from './features/info-covid/components/info-country/graficos/curva-contagios/curva-contagios.component';


@NgModule({
  declarations: [
    AppComponent,
    GlobalMapComponent,
    ResumeComponent,
    GraficoBarResumeComponent,
    NgbdSortableHeader,
    GraficoContagiadosComponent,
    GraficoDecesosComponent,
    GraficoPorcentageUpComponent,
    GraficoPorcentageDownComponent,
    InfoHeaderComponent,
    TableResumeComponent,
    InfoCountryComponent,
    CountryPercentagesComponent,
    CurvaContagiosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ChartsModule,
    NgxSpinnerModule,
    NgbModule,
    // MatProgressSpinnerModule
    // ChartModule
  ],
  providers: [CovidService, CountryService, DecimalPipe],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
