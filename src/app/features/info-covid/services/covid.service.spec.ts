import { TestBed } from '@angular/core/testing';

import { GraficoLinealService } from './grafico-lineal.service';

describe('GraficoLinealService', () => {
  let service: GraficoLinealService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraficoLinealService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
