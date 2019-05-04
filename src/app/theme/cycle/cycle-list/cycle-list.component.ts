import { Component, OnInit } from '@angular/core';
import { CycleService } from '../../../services/cycle/cycle.service';
import { Pool } from '../../../shared/pool/pool';
import { Farm } from '../../../shared/farm/farm';


@Component({
  selector: 'app-cycle-list',
  templateUrl: './cycle-list.component.html',
  styleUrls: ['./cycle-list.component.scss']
})
export class CycleListComponent implements OnInit {
  rows = [];
  tempRows = [];
  // Modal Detalle de Ciclo
  cycleId: number;
  cycleStartDate: number;
  cyclePool: Pool;
  cycleFarm: Farm;
  cycleStatus: boolean;
  cycleSowingDate: number;
  cyclePrevSowingDate: number;
  cycleHarvestDate: number;
  // Modal Nuevo Ciclo
  // newCycleId: number;
  // newCycleStartDate: number;
  // newCyclePool: Pool;
  // newCycleStatus: boolean;
  // newCycleSowingDate: number;
  // newCyclePrevSowingDate: number;
  // newCycleHarvestDate: number;

  constructor(
    private cycleService: CycleService
    ) { }

  ngOnInit() {
    this.cycleService.getCycles()
                      .subscribe(
                        sowings => this.rows = sowings,
                        err => console.log('error: ' + err));
    this.tempRows = this.rows;
  }
  onActivate(event) {
    if (event.type === 'dblclick') {
      this.cycleId = event.row.id;
      this.cycleStartDate = event.row.cycleStartDate;
      this.cyclePool = event.row.cyclePool.code;
      this.cycleFarm = event.row.cyclePool.farm.name;
      this.cycleStatus = event.row.cycleStatus;
      this.cycleSowingDate = event.row.cycleSowingDate;
      this.cyclePrevSowingDate = this.cycleSowingDate - this.cycleStartDate;
      this.cycleHarvestDate = event.row.cycleHarvestDate;
    }
  }
  searchFilter(event) {
    const val = event.target.value.toLowerCase();
    console.log(val);                                  
  }
  clean_modal() {
    this.cycleId = null;
    this.cycleStartDate = null;
    this.cyclePool = null;
    this.cycleFarm = null;
    this.cycleStatus = null;
    this.cycleSowingDate = null;
  }
}
