
import { Empresa } from '../empresa/empresa';

export class Representante {
    public id: number;
    public __str__: string;
    public nombre: string;
    public nombre_carta: string;
    public telefono: string;
    public empresa: string;
}

export class RepresentanteCreate {
    public cedula: string;
    public nombre: string;
    public nombre_carta: string;
    public telefono: string;
    public empresa: string;
    public correos: string[];
}


export class RepresentanteDetail {
    public id: number;
    public nombre: string;
    public nombre_carta: string;
    public empresa: Empresa;
    public telefono: string;
    public correos: string[];
}
