import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Role } from '../../shared/role/roles';
import { Policie } from '../../shared/policie/policie';
import { PolicieService } from '../policie/policie.service';

@Injectable({
    providedIn: 'root'
})

export class RoleService {

    private policie1: Policie;
    private policie2: Policie;
    private policie3: Policie;
    private roles: Role[];

    constructor(private policieService: PolicieService) {
        this.policieService.getPolicie(1).subscribe(policeResult => this.policie1 = policeResult,
            err => console.log('error: ' + err));

        this.policieService.getPolicie(2).subscribe(policeResult => this.policie2 = policeResult,
            err => console.log('error: ' + err));

        this.policieService.getPolicie(3).subscribe(policeResult => this.policie3 = policeResult,
                err => console.log('error: ' + err));

        this.roles = [
            { id: 1, name: 'Administrador', policies: [this.policie1, this.policie2], description: 'policita administrador'},
            { id: 2, name: 'Dueno', policies: [this.policie1, this.policie2, this.policie3], description: 'politica dueno'},
            { id: 3, name: 'Obrero', policies: [this.policie1], description: 'politica obrero' }
        ];
    }

    public getRoles(): Observable<Role[]> {
        return of(this.roles);
    }

    public getRole(id: number): Observable<Role> {
        return of(this.roles.filter(p => p.id === id)[0]);
    }

}
