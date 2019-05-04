import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Cycle } from '../../shared/cycle/cycle';


@Injectable({
    providedIn: 'root'
})
export class CycleService {


    private cycles: Cycle[];

    constructor() {

        this.cycles = [
            {
                id: 1,
                cycleStartDate: 1538096590094,
                cyclePool: {
                    _id: '1512345214758',
                    code: 'Piscina Uno',
                    description: 'Piscina Principal',
                    farm: {
                        _id: 'dasdwe55555',
                        name: 'EM1',
                        detail: 'Detail',
                        locate: '152255',
                        area: 2000,
                    },
                },
                cycleStatus: true,
                cycleSowingDate: 1800000000000
            },
            {
                id: 2,
                cycleStartDate: 1538156226136,
                cyclePool: {
                    _id: '1512345214758',
                    code: 'Piscina Dos',
                    description: 'Piscina Secundaria',
                    farm: {
                        _id: 'dasdwe555457955',
                        name: 'EM2',
                        detail: 'Detail',
                        locate: '152255',
                        area: 2000,
                    },
                },
                cycleStatus: false,
                cycleSowingDate: 1538156226136
            }
        ];
    }

    public getCycles(): Observable<Cycle[]> {
        return of(this.cycles);
    }
}
