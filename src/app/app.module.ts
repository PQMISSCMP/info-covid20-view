import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';
import { NgxSpinnerModule } from 'ngx-spinner';

import { CovidService } from './features/info-covid/services/covid.service';

import { AppComponent } from './app.component';
import { GlobalMapComponent } from './features/info-covid/components/global-map/global-map.component';
import { GraficoLinealComponent } from './features/info-covid/components/grafico-lineal/grafico-lineal.component';
import { ResumeComponent } from './features/info-covid/components/resume/resume.component';
import { GraficoBarResumeComponent } from './features/info-covid/components/grafico-bar-resumen/grafico-bar-resume.component';

@NgModule({
  declarations: [
    AppComponent,
    GraficoLinealComponent,
    GlobalMapComponent,
    ResumeComponent,
    GraficoBarResumeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ChartsModule,
    NgxSpinnerModule
  ],
  providers: [CovidService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
