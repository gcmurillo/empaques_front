
import { TipoEmpaque } from '../tipo_empaque/tipo_empaque';
import { Marca } from '../marca/marca';
import { Clase } from '../clase/clase';
import { Modelo } from '../modelo/modelo';
import { EstadoEmpaque } from '../estado_empaque/estado_empaque';
import { Ubicacion } from '../ubicacion/ubicacion';
import { Custodio } from '../custodio/custodio';


export class Empaque {
    public __str__: string;
    public codigo: string;
    public codigo_barras: string;
    public serie: string;
    public tipo_empaque: number;
    public marca: string;
    public clase: number;
    public modelo: number;
    public estado: number;
    public ubicacion: number;
    public custodio: number;
    public costo: number;
    public precio: number;
}

export class EmpaqueDetail {
    public __str__: string;
    public codigo: string;
    public codigo_barras: string;
    public serie: string;
    public tipo_empaque: TipoEmpaque;
    public marca: Marca;
    public clase: Clase;
    public modelo: Modelo;
    public estado: EstadoEmpaque;
    public ubicacion: Ubicacion;
    public custodio: Custodio;
    public costo: number;
    public precio: number;
}
