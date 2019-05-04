import { Company } from '../company/company';

export class Farm {
    public _id: string;
    public name: string;
    public detail: string;
    public locate: string;
    public area: number;
}

export class FarmWithCompany {
    public _id: string;
    public name: string;
    public detail: string;
    public locate: string;
    public area: number;
    public company: Company;
}

// export class FarmCreate {
//     public name: string;
//     public detail: string;
//     public locate: string;
//     public area: number;
// }
