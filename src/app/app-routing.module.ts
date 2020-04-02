import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GraficoLinealComponent } from './features/info-covid/components/grafico-lineal/grafico-lineal.component';

const routes: Routes = [
  { path: 'pais/:pais', component: GraficoLinealComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
