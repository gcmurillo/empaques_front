import { Component, OnInit } from '@angular/core';
import { Empaque, EmpaqueDetail } from '../../../shared/empaque/empaque';
import { EmpaquesService } from '../../../services/empaques/empaques.service';
import { TipoEmpaquesService } from '../../../services/tipo_empaques/tipo_empaques.service';


@Component({
    selector: 'app-empaques-list',
    templateUrl: './empaques-list.component.html',
    styleUrls: [
        './empaques-list.component.scss',
        '../../../../assets/icon/icofont/css/icofont.scss'
    ]
})
export class EmpaquesListComponent implements OnInit {

    rows = [];
    selected = [];
    empaques = [];
    tipo_empaques = [];

    columns: any[] = [
        {
            prop: '__str__',
            name: 'Nombre'
        },
        {
            prop: 'codigo',
            name: 'Codigo'
        },
        {
            prop: 'codigo_barras',
            name: 'Codigo Barras'
        },
        {
            prop: 'serie',
            name: 'Serie'
        },
        {
            prop: 'tipo_empaque.nombre',
            name: 'Tipo Empaque'
        },
        {
            prop: 'clase.nombre',
            name: 'Clase'
        },
        {
            prop: 'modelo.nombre',
            name: 'Modelo'
        },
        {
            prop: 'estado.nombre',
            name: 'Estado'
        },
        {
            prop: 'ubicacion.__str__',
            name: 'Ubicacion'
        },
        {
            prop: 'custodio.__str__',
            name: 'Custodio'
        },
    ];

    constructor(private empaqueService: EmpaquesService,
                private tipoEmpaqueService: TipoEmpaquesService) { }

    ngOnInit() {
        this.empaqueService.getEmpaques().subscribe(
            empaques => {
                this.rows = empaques;
                this.empaques = empaques;
            },
            err => console.log('error: ' + err.status)
        );

        this.tipoEmpaqueService.getTipoEmpaques().subscribe(
            // tipos_empaques => this.tipo_empaques = tipo_empaques,
            tipo_empaques => {
                this.tipo_empaques = tipo_empaques;
            },
            err => console.log('error: ' + err.status)
        );

    }

    filtrar(id) {
        if (id === 'TODO') {
            this.rows = this.empaques;
        } else {
            this.rows = this.empaques.filter(
                empaque => empaque.tipo_empaque.id === id
            );
        }
    }

    onSelect({ selected }) {
      this.selected.splice(0, this.selected.length);
      this.selected.push(...selected);
    }

    onActivate(event) {}

}
