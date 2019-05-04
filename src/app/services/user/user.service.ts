import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../shared/user/user';
import { RoleService } from '../../services/role/role.service';
import { Role } from '../../shared/role/roles';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private users: User[];

    roles: Role[];

    constructor(private roleService: RoleService, private http: HttpClient) {
        this.roleService.getRoles().subscribe(rolesResult => this.roles = rolesResult,
            err => console.log('error: ' + err));

        this.users = [
            {
                id: 1,
                name: 'Juana',
                last_name: 'Rodriquez',
                username: 'jrodri',
                email: 'jrodri@example.com',
                groups: [this.roles[0]],
                resources: ['Camaronera 1'],
                user_level: 'SaaSLevel',
                parent: 0,
                company: 'Pepita S.A.',
                farm: 'Camarones 1'
            },
            {
                id: 2,
                name: 'Claudine',
                last_name: 'Neal',
                username: 'cneal',
                email: 'cneal@example.com',
                groups: [this.roles[1]],
                resources: ['Camaronera 1'],
                user_level: 'RootLevel',
                parent: 1,
                company: 'Biof EEDER.',
                farm: 'Camarones 555'
            },
            {
                id: 3,
                name: 'Beryl',
                last_name: 'Rice',
                username: 'brice',
                email: 'brice@example.com',
                groups: [this.roles[2]],
                resources: ['Camaronera 1'],
                user_level: 'UserLevel',
                parent: 2,
                company: 'Carminosca.',
                farm: 'Shirmps 593'
            },
            {
                id: 4,
                name: 'Wilder',
                last_name: 'Gonzales',
                username: 'wgonzales',
                email: 'wgonzales@example.com',
                groups: [this.roles[0]],
                resources: ['Camaronera 1'],
                user_level: 'SaaSLevel',
                parent: 1,
                company: 'The Last One',
                farm: 'CamEcu'
            },
            {
                id: 5,
                name: 'Carol',
                last_name: 'Moran',
                username: 'cmoran',
                email: 'cmorans@example.com',
                groups: [this.roles[2]],
                resources: ['Camaronera 1'],
                user_level: 'UserLevel',
                parent: 2,
                company: 'The Last One',
                farm: 'Camarones 1'
            },
            {
                id: 6,
                name: 'Joselo',
                last_name: 'Mendoza',
                username: 'jmendoza',
                email: 'jmendoza@example.com',
                groups: [this.roles[0]],
                resources: ['Camaronera 1'],
                user_level: 'SaaSLevel',
                parent: 1,
                company: 'The Last One',
                farm: 'InfoGraShrimp S.A.'
            }
        ];
    }

    public getUsers(): Observable<User[]> {
        return of(this.users);
    }

    public getUser(id: number): Observable<User> {
        return of(this.users.filter(p => p.id === id)[0]);
    }

}
