import {SortColumn, SortDirection} from '../directives/sortable.directive';

export interface ResponseDataChart {
    Contagiados: number[];
    Decesos: number[];
    Actualizaciones: string[];
}

export interface CasosResume {
    lugar: string;
    totalContagiados: number;
    totalDecesos: number;
    porcent: number;
    ultContagiados: number;
    statusContagiados: string;
    nroContagiadosAnt: number;
    ultDecesos: number;
    statusDecesos: string;
    nroDecesosAnt: number;
    tiempoDesdeUltAct: number;
    fechUltActualizacion: Date;
    horasDesdeUltActualiza: string;
    percentages: PercentageModel[];
}

export interface Actualizacion {
    Lugar: string;
    Contagiados: number;
    Decesos: number;
    Actualizado: Date;
}


export interface SearchResult {
    resumes: CasosResume[];
    total: number;
}

export interface State {
    page?: number;
    pageSize?: number;
    searchTerm?: string;
    sortColumn: SortColumn;
    sortDirection: SortDirection;
}

export interface PercentageModel {
    percent: number;
    Fecha: Date;
}


export interface InfoHeader {
    totalInfected: number;
    totalDead: number;
    percentage: string;
    relation: number;
    titulo: string;
}


export interface InputSelectCountry {
    percentages: PercentageModel[];
    dataSubRegion: CasosResume[];
    curvaContagios: number[];
}


export interface SelectCountry {
    flagSelected: boolean;
    country?: string;
}


export interface CurvaContagiados {
    lugar: string;
    valores: number[];
}
