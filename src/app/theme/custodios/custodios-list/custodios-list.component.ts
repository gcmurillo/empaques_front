import {Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { Empaque, EmpaqueDetail } from '../../../shared/empaque/empaque';
import { EmpaquesService } from '../../../services/empaques/empaques.service';
import { TipoEmpaquesService } from '../../../services/tipo_empaques/tipo_empaques.service';
import { UbicacionesService } from '../../../services/ubicaciones/ubicaciones.service';
import { ClasesService } from '../../../services/clases/clases.service';

import { CustodiosService } from '../../../services/custodios/custodios.service';
import { LoginService } from '../../../services/login/login.service';

@Component({
    selector: 'app-custodios-list',
    templateUrl: './custodios-list.component.html',
    styleUrls: ['../../../../assets/icon/icofont/css/icofont.scss'
    ]
})
export class CustodiosListComponent implements OnInit {

    rows = [];
    selected = [];
    empaques = [];
    tipo_empaques = [];
    ubicaciones = [];
    clases = [];
    custodios = [];

    filterText = '';

    @ViewChild('table') table: any;

    columns: any[] = [
        {
            prop: '__str__',
            name: 'Nombre'
        },
        {
            prop: 'representante.nombre',
            name: 'Representante'
        },
        {
            prop: 'representante.empresa.nombre',
            name: 'Empresa'
        },
        {
            prop: 'representante.nombre_carta',
            name: 'Nombre en carta'
        },
        {
            prop: 'vendedor.nombre',
            name: 'Vendedor'
        },
    ];

    constructor(private custodioService: CustodiosService,
                private router: Router,
                private loginService: LoginService,
                ) { }

    ngOnInit() {

        this.custodioService.getCustodios().subscribe(
            custodios => {
                this.custodios = custodios
                this.rows = custodios;
            },
            err => console.log('error: ' + err.status)
        );

        this.loginService.isLoged('CO');
    }

    filterTable() {
        console.log(this.filterText);
    }

    updateFilter(event) {
        const val = event.target.value.toLowerCase();
    
        // filter our data
        const temp = this.custodios.filter(function(d) {
          return d.__str__.toLowerCase().indexOf(val) !== -1 || !val;
        });
    
        // update the rows
        this.rows = temp;
        // Whenever the filter changes, always go back to the first page
        this.table.offset = 0;
    }

    onActivate(event) {}

}
