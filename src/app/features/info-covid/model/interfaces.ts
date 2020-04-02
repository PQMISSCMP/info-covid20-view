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
}

export interface Actualizacion {
    Lugar: string;
    Contagiados: number;
    Decesos: number;
    Actualizado: Date;
}

