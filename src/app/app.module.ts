import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';
import { NgxSpinnerModule } from 'ngx-spinner';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { CovidService } from './features/info-covid/services/covid.service';
import { CountryService } from './features/info-covid/services/table.services';

import { AppComponent } from './app.component';
import { GlobalMapComponent } from './features/info-covid/components/global-map/global-map.component';
import { GraficoLinealComponent } from './features/info-covid/components/grafico-lineal/grafico-lineal.component';
import { ResumeComponent } from './features/info-covid/components/resume/resume.component';
import { GraficoBarResumeComponent } from './features/info-covid/components/grafico-bar-resumen/grafico-bar-resume.component';
import { DecimalPipe } from '@angular/common';
import { NgbdSortableHeader } from './features/info-covid/directives/sortable.directive';
import { GraficoContagiadosComponent } from './features/info-covid/components/grafico-bar-resumen/graficos-resume/contagiados/contagiados.component';
import { GraficoDecesosComponent } from './features/info-covid/components/grafico-bar-resumen/graficos-resume/decesos/decesos.component';
import { GraficoPorcentageUpComponent } from './features/info-covid/components/grafico-bar-resumen/graficos-resume/porcentages-altos/porcentage-up.component';
import { GraficoPorcentageDownComponent } from './features/info-covid/components/grafico-bar-resumen/graficos-resume/porcentages-bajos/porcentage-dw.component';


@NgModule({
  declarations: [
    AppComponent,
    GraficoLinealComponent,
    GlobalMapComponent,
    ResumeComponent,
    GraficoBarResumeComponent,
    NgbdSortableHeader,
    GraficoContagiadosComponent,
    GraficoDecesosComponent,
    GraficoPorcentageUpComponent,
    GraficoPorcentageDownComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ChartsModule,
    NgxSpinnerModule,
    NgbModule,
    // ChartModule
  ],
  providers: [CovidService, CountryService, DecimalPipe],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
