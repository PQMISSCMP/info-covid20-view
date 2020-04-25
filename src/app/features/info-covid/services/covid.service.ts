import { Injectable } from '@angular/core';
import request from 'axios';
import { CasosResume, SelectCountry, CurvaContagiados } from '../model/interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CovidService {

  URL_API = '/api/';
  TITULO_DEFAULT = 'Información del COVID-19 (coronavirus)';

  asia = ['Tajikistan', 'Azerbaijian', 'Uzbekistán', 'West Bank and Gaza Strip', 'Macau', 'Hong Kong', 'East Timor', 'Palestinian territories', 'Afghanistan', 'Armenia', 'Azerbaijan', 'Bahrain',  'Bangladesh',  'Bhutan',  'Brunei',  'Cambodia',  'China',  'Cyprus',  'Georgia',  'India',  'Indonesia',  'Iran',  'Iraq',  'Israel',  'Japan', , 'Jordan',  'Kazakhstan',  'Kuwait',  'Kyrgyzstan',  'Laos',  'Lebanon',  'Malaysia',  'Maldives',  'Mongolia',  'Myanmar',  'Nepal',  'North Korea',  'Oman',  'Pakistan',  'Palestine',  'Philippines',  'Qatar',  'Saudi Arabia',  'Singapore',  'South Korea',  'Sri Lanka',  'Syria',  'Taiwan',  'Tajikistan',  'Thailand',  'Timor-Leste',  'Turkey',  'Turkmenistan',  'United Arab Emirates',  'Uzbekistan',  'Vietnam',  'Yemen'];
  sudamerica = ['Chile', 'Ecuador', 'Bolivia', 'Brazil', 'Argentina', 'Colombia', 'Uruguay', 'Peru', 'Paraguay', 'Venezuela', 'Guyana', 'Suriname', 'Trinidad and Tobago', 'French Guiana', 'Falkland Islands'];
  europa = ['Russia', 'Bosnia', 'Vatican City', 'Gibraltar', 'Faroe Islands', 'Liechtenstein', 'Isle of Man', 'Kosovo', 'Channel Islands', 'Czech Republic', 'Guernsey', 'Albania', 'Andorra', 'Austria', 'Belarus', 'Belgium', 'Bosnia and Herzegovina', 'Bulgaria', 'Croatia', 'Cyprus', 'Czechia', 'Denmark', 'Estonia', 'Finland', 'France', 'Georgia', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Italy', 'Latvia', 'Lithuania', 'Luxembourg', 'Malta', 'Monaco', 'Montenegro', 'Netherlands', 'North Macedonia', 'Norway', 'Poland', 'Portugal', 'Moldova', 'Romania', 'San Marino', 'Serbia', 'Slovakia', 'Slovenia', 'Spain', 'Sweden', 'Switzerland', 'Turkey',  'Ukraine', 'United Kingdom'];
  norteAmerica = ['Antigua and Barbuda',  'Bahamas',  'Barbados',  'Belize',  'Canada',  'Costa Rica',  'Cuba',  'Dominica',  'Dominican Republic',  'El Salvador',  'Grenada',  'Guatemala',  'Haiti',  'Honduras',  'Jamaica',  'Mexico',  'Nicaragua',  'Panama',  'Saint Kitts and Nevis',  'Saint Lucia',  'Saint Vincent and the Grenadines',  'United States', 'Anguilla',  'Aruba',  'Bermuda',  'British Virgin Islands',  'Cayman Islands',  'Curacao',  'Greenland',  'Guadeloupe',  'Martinique',  'Montserrat',  'Puerto Rico', 'Saint Barthelemy',  'Saint Martin', 'Saint Pierre and Miquelon',  'Sint Eustatius',  'Sint Maarten',  'Turks and Caicos',  'US Virgin Islands'];
  oceania = ['Australia',  'Fiji',  'Kiribati',  'Marshall Islands', 'Micronesia',  'Nauru',  'New Zealand',  'Palau',  'Papua New Guinea',  'Samoa',  'Solomon Islands',  'Tonga',  'Tuvalu',  'Vanuatu',  'American Samoa',  'Cook Islands',  'French Polynesia',  'Guam',  'New Caledonia',  'Niue',  'Norfolk Island',  'Northern Mariana Islands',  'Pitcairn Islands',  'Tokelau',  'Wake Island',  'Wallis and Futuna'];
  africa = ['Réunion Island', 'Cape Verde', 'Mayotte', 'Congo', 'Ivory Coast', 'Western Sahara', 'Algeria',  'Angola',  'Benin',  'Botswana',  'Burkina Faso',  'Burundi',  'Cabo Verde',  'Cameroon',  'Central African Republic',  'Chad',  'Comoros',  'Democratic Republic of Congo',  'Cote d\'Ivoire',  'Djibouti',  'Egypt',  'Equatorial Guinea',  'Eritrea',  'Eswatini',  'Ethiopia',  'Gabon',  'Gambia',  'Ghana',  'Guinea',  'Guinea-Bissau',  'Kenya',  'Lesotho',  'Liberia',  'Libya',  'Madagascar',  'Malawi',  'Mali',  'Mauritania',  'Mauritius',  'Morocco',  'Mozambique',  'Namibia',  'Niger',  'Nigeria',  'Rwanda',  'Sao Tome and Principe',  'Senegal',  'Seychelles',  'Sierra Leone',  'Somalia',  'South Africa',  'South Sudan',  'Sudan',  'Tanzania',  'Togo',  'Tunisia',  'Uganda',  'Zambia',  'Zimbabwe'];

  private dataSource = new BehaviorSubject<SelectCountry>({country: '/', flagSelected: false});  country = this.dataSource.asObservable();

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
      // console.log('reintentando....');
      // this.getHistoryList();
      throw error.message;
    }
  }

  async getCurvaContagios(country: string): Promise <CurvaContagiados[]> {
    try {
      const result: CurvaContagiados[] = await (await request.get(`${this.URL_API}/report/${country}`)).data;
      return result;
    } catch (error) {
      // console.log('reintentando....');
      // this.getCurvaContagios(country);
      throw error.message;
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
      glosa = `recién`;
    }
    return glosa;
}




}
