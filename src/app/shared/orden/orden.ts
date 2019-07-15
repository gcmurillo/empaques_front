import { TipoOrden } from '../tipo_orden/tipo_orden';
import { Ubicacion } from '../ubicacion/ubicacion';
import { Custodio } from '../custodio/custodio';
import { Empaque, EmpaqueDetail } from '../empaque/empaque';

export class Orden {
    public __str__: string;
    public tipo: TipoOrden;
    public nombre: string;
    public descripcion: string;
    public fecha_creacion: string;
    public fecha_aprobacion: string;
    public ubicacion_inicial: Ubicacion;
    public aprobado: boolean;
    public nueva_ubicacion: Ubicacion;
    public nuevo_custodio: Custodio;
    public completo: boolean;
    public despachado: boolean;
}

export class TransaccionCreate {
    public tipo: number;
    public nombre: string;
    public descripcion: string;
    public ubicacion_inicial: number;
    public nueva_ubicacion: number;
    public nuevo_custodio: number;
    public fecha_inicio: string;
    public dias_plazo: number;
}

export class OrdenEmpaqueDetailList {
    public id: number;
    public __str__: string;
    public orden: Orden;
    public empaque: EmpaqueDetail;
    public aprobado: boolean;
    public entregado: boolean;
}

export class OrdenEmpaqueDetailCreate {
    public orden: number;
    public empaque: string;
    public aprobado: boolean;
    public entregado: boolean;
}

export class OrdenDespachar {
    public tipo: number;
    public despachado: boolean;
    public ubicacion_inicial: number;
}