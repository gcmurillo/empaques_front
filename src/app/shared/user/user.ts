import { Role } from '../role/roles';

export class User {
    public id: number;
    public name: string;
    public last_name: string;
    public username: string;
    public email: string;
    public resources: any[];
    public groups: Role[];
    public user_level: string;
    public parent: number;
    public company: string;
    public farm: string;
}

// user_levels: SaaSLevel, RootLevel, UserLevel
/*
export class User {
    public id: number;
    public name: string;
    public role: string;
    public company: string;
    public farm: string;
}*/
