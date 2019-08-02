import { Component, OnInit, ViewChild } from '@angular/core';
import { TransaccionesService } from '../../../services/transacciones/transacciones.service';
import { EmpaquesService } from '../../../services/empaques/empaques.service';
import swal from 'sweetalert2';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-llenado-list',
  templateUrl: './llenado-list.component.html',
  styleUrls: [
    '../../../../assets/icon/icofont/css/icofont.scss'
  ]
})
export class LlenadoListComponent implements OnInit {

  empaques = [];
  rows = [];

  transacciones = [];

  empaques_messages = {
    emptyMessage: "Sin empaques que llenar",
    totalMessage: " Empaques"
  }

  @ViewChild('empaques') tablaEmpaques: any;

  constructor(private transaccionService: TransaccionesService,
              private empaquesService: EmpaquesService,
              private loginService: LoginService,
              ) { }

  ngOnInit() {
    this.empaquesService.getEmpaquesVacios().subscribe(
      empaques => { 
        this.rows = empaques;
        this.empaques = empaques;
      },
      err => console.log('error: ' + err.status)
    );
    
    this.loginService.isLoged('OP');
  }

  setLleno(row) {
    console.log(row)
    this.empaquesService.llenarEmpaques(row, row.codigo).subscribe(
      response => {
        console.log(response)
        this.empaquesService.getEmpaquesVacios().subscribe(
          empaques => { 
            this.rows = empaques;
          },
          err => console.log('error: ' + err.status)
        );
      },
      err => console.log(err)
    );
  }

  onActivate(event) {}

  empaquesFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.empaques.filter(function(d) {
      return d.codigo.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.tablaEmpaques.offset = 0;
  }

}
