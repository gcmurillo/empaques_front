
export class Ciudad {
    public id: number;
    public nombre: string;
    public descripcion: string;
}

export class EstadoDisp {
    public id: number;
    public nombre: string;
    public descripcion: string;
}

export class Bodega {
    public id: number;
    public nombre: string;
    public ciudad: Ciudad;
}

export class Ubicacion {
    public id: number;
    public bodega: Bodega;
    public estado_disp: EstadoDisp;
}
