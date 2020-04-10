import { Injectable } from '@angular/core';
import request from 'axios';
import { CasosResume } from '../model/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CovidService {

  URL_API = 'https://api-coronatracing.herokuapp.com';

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
