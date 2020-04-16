import { Injectable } from '@angular/core';
import request from 'axios';
import { CasosResume, SelectCountry } from '../model/interfaces';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CovidService {

  URL_API = 'https://api-coronatracing.herokuapp.com';
  sudamerica = ['Chile', 'Ecuador', 'Bolivia', 'Brazil', 'Argentina', 'Colombia', 'Uruguay', 'Peru', 'Paraguay', 'Venezuela', 'Guyana', 'Suriname', 'Trinidad and Tobago'];
  // public countrySelected: boolean;


  private dataSource = new BehaviorSubject<SelectCountry>({country: '/', flagSelected: false});
  country = this.dataSource.asObservable();

  updatedCountrySelection(data: SelectCountry) {
    this.dataSource.next(data);
  }


  async getHistoryByCountry(country: string): Promise <CasosResume[]> {
    const result: CasosResume[] = await (await request.get(`${this.URL_API}/cases/${country}`)).data;
    return result;
  }

  async getHistoryList(): Promise <CasosResume[]> {
    try {
      const result: CasosResume[] = await (await request.get(`${this.URL_API}/cases`)).data;
      return result;
    } catch (error) {
      console.log('reintentando....');
      this.getHistoryList();
    }
  }


  horasToTiempoGlosa = (hrs: number) => {
    const dias = Math.floor(hrs / 24);
    const horas = Math.floor(hrs % 24);
    let glosa = '';

    if (dias === 0 && horas > 0) {
      glosa = `${horas.toFixed(0)}h`;
    }

    if (dias > 0 && horas === 0) {
      glosa = `${dias.toFixed(0)}d`;
    }

    if (dias > 0 && horas > 0) {
      glosa = `${dias.toFixed(0)}d ${horas.toFixed(0)}h`;
    }

    if (dias === 0 && horas === 0) {
      glosa = `an instant`;
    }
    return glosa;
}




}
