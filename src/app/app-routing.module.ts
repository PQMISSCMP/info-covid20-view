import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InfoCountryComponent } from './features/info-covid/components/info-country/info-country.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'pais/:pais', component: InfoCountryComponent },
  { path: '', component: AppComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
