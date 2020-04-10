import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { CovidService } from '../../services/covid.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CasosResume, State, SearchResult } from '../../model/interfaces';

import {DecimalPipe} from '@angular/common';
import {QueryList, ViewChildren} from '@angular/core';
import {Observable, BehaviorSubject, Subject, of} from 'rxjs';

import { CountryService } from '../../services/table.services';
import {NgbdSortableHeader, SortEvent, SortColumn, SortDirection} from '../../directives/sortable.directive';


const compare = (v1: string, v2: string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(resumes: CasosResume[], column: SortColumn, direction: string): CasosResume[] {
  if (direction === '' || column === '') {
    return resumes;
  } else {
    return [...resumes].sort((a, b) => {
      const res = compare(`${a[column]}`, `${b[column]}`);
      return direction === 'asc' ? res : -res;
    });
  }
}


@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {

  // get resumes$() { return this._resumes$.asObservable(); }
  // get total$() { return this._total$.asObservable(); }
  // get loading$() { return this._loading$.asObservable(); }
  // get page() { return this.state.page; }
  // get pageSize() { return this.state.pageSize; }
  // get searchTerm() { return this.state.searchTerm; }
  
  // // tslint:disable-next-line: adjacent-overload-signatures
  // set page(page: number) { this._set({page}); }
  // // tslint:disable-next-line: adjacent-overload-signatures
  // set pageSize(pageSize: number) { this._set({pageSize}); }
  // // tslint:disable-next-line: adjacent-overload-signatures
  // set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }


  private estado: State = {
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private covidService: CovidService, private spinner: NgxSpinnerService, public service: CountryService) {}
  public totContMundo: number;
  public totDecMundo: number;

  // private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  // private _resumes$ = new BehaviorSubject<CasosResume[]>([]);
  // private _total$ = new BehaviorSubject<number>(0);


  private state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  // resumes$: Observable<CasosResume[]>;
  // totalResumes$: Observable<number>;

  // tslint:disable-next-line: member-ordering
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  // tslint:disable-next-line: member-ordering
  @Output() propagar = new EventEmitter<CasosResume[]>();

  actualizacionesResume: CasosResume[] = [];

  private _set(patch: Partial<State>) {
    Object.assign(this.state, patch);
    this._search$.next();
  }

  onSort({column, direction}: SortEvent) {
    console.log({column, direction});

    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.sortColumn = column;
    this.sortDirection = direction;
  }

  private _search(): Observable<any> {
    const {sortColumn, sortDirection} = this.estado;

    // 1. sort
    const countries = sort([], sortColumn, sortDirection);

    return of(countries);
  }

  async ngOnInit() {

    try {

      setTimeout(_ => { this.spinner.show(); }, 10);

      const list = await this.covidService.getHistoryList();
      this.totContMundo = list.reduce((acc, val) => acc + val.totalContagiados , 0);
      this.totDecMundo = list.reduce((acc, val) => acc + val.totalDecesos , 0);


      if (typeof list === 'undefined') { throw new Error('Error al obtener los datos'); }
      list.map(x => {
        const hrs = Math.floor(Math.abs(new Date().getTime() - new Date(x.fechUltActualizacion).getTime()) / 36e5);
        const item: CasosResume = {
          lugar: x.lugar,
          totalContagiados: x.totalContagiados,
          totalDecesos: x.totalDecesos,
          porcent: x.porcent,
          ultContagiados: x.ultContagiados,
          ultDecesos: x.ultDecesos,
          tiempoDesdeUltAct: x.tiempoDesdeUltAct,
          fechUltActualizacion: x.fechUltActualizacion,
          nroContagiadosAnt: x.nroContagiadosAnt,
          nroDecesosAnt: x.nroDecesosAnt,
          statusContagiados: x.statusContagiados,
          statusDecesos: x.statusDecesos,
          horasDesdeUltActualiza: this.covidService.horasToTiempoGlosa(hrs),
          percentages: x.percentages
        };
        this.actualizacionesResume.push(item);
      });


      this.actualizacionesResume = this.actualizacionesResume.sort((a, b) => b.totalContagiados - a.totalContagiados);

      // const paisesSudamerica = ['Chile', 'Ecuador', 'Bolivia', 'Brazil', 'Argentina'	, 'Colombia', 'Uruguay', 'Peru', 'Paraguay', 'Venezuela'];
      // const sudamerica = this.actualizacionesResume.filter(filtro => paisesSudamerica.find(x => x === filtro.lugar) );

      // console.log(sudamerica);
      // console.log(sudamerica.reduce((a, v) => a + v.totalContagiados, 0));
      // console.log(sudamerica.reduce((a, v) => a + v.totalDecesos, 0));


      setTimeout(_ => { this.spinner.hide(); }, 10);

      this.onPropagar();

    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  }

  onPropagar() {
    this.propagar.emit(this.actualizacionesResume);
  }

  callChart(pais: string) {
    console.log(pais);
  }

  // private _search(): Observable<SearchResult> {
  //   const {sortColumn, sortDirection, pageSize, page, searchTerm} = this.state;

  //   // 1. sort
  //   let resumes = sort(this.resumes, sortColumn, sortDirection);

  //   // 2. filter
  //   resumes = resumes.filter(country => matches(country, searchTerm, this.pipe));
  //   const total = resumes.length;

  //   // 3. paginate
  //   resumes = resumes.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
  //   // return of({countries: resumes, total});
  //   return;
  // }


}
