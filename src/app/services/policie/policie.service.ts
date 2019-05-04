import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Policie } from '../../shared/policie/policie';


@Injectable({
    providedIn: 'root'
})
export class PolicieService {

    private policies: Policie[] = [
        {
            id: 1,
            name: 'Policie 1',
            statements: [
                {
                    effect: 'Allow',
                    action: 'List',
                    resources: '*'
                }
            ]
        },
        {
            id: 2,
            name: 'Policie 2',
            statements: [
                {
                    effect: 'Denied',
                    action: 'Write',
                    resources: '*'
                },
                {
                    effect: 'Allow',
                    action: 'Read',
                    resources: '*'
                }
            ]
        },
        {
            id: 3,
            name: 'Policie 3',
            statements: [
                {
                    effect: 'Denied',
                    action: 'Write',
                    resources: '*'
                },
                {
                    effect: 'Allow',
                    action: 'Read',
                    resources: '*'
                }
            ]
        }
    ];

    constructor() { }

    public getPolicies(): Observable<Policie[]> {
        return of(this.policies);
    }

    public getPolicie(id: number): Observable<Policie> {
        return of(this.policies.filter(p => p.id === id)[0]);
    }

}
