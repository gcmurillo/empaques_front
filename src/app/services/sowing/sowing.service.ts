import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Sowing } from '../../shared/sowing/sowing';



@Injectable({
    providedIn: 'root'
})
export class SowingService {

    private sowings: Sowing[];

    constructor() {
        this.sowings = [
            {
                id: 1,
                sowingNumberOfAnimals: 3233,
                sowingInitialWeight: 64660,
                sowingDensityOfAnimals: 50660,
                sowingDate: 1538168461637,
                sowingPool: {
                    _id: 'abcdef5555',
                    code: '1255588',
                    description: 'easy cam pool 1',
                    farm: {
                        _id: 'dasdwe55555',
                        name: 'EM1',
                        detail: 'Detail',
                        locate: '152255',
                        area: 2000,
                    },
                }
            }
        ];
    }

    public getSowings(): Observable<Sowing[]> {
        return of(this.sowings);
    }
}
