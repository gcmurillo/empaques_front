import { Policie } from '../policie/policie';

export class Role {
    public id: number;
    public name: string;
    public description: string;
    public policies: Policie[];
}
