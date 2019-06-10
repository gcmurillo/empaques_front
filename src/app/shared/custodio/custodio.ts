
import {  RepresentanteDetail } from '../representante/representante';
import { Vendedor } from '../vendedor/vendedor';

export class Custodio {
    public id: number;
    public __str__: string;
    public representante: number;
    public vendedor: number;
}

export class CustodioDetail {
    public id: number;
    public __str__: string;
    public representante: RepresentanteDetail;
    public vendedor: Vendedor;
}