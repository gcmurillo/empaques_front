import { Component, OnInit } from '@angular/core';
import { SowingService } from '../../../services/sowing/sowing.service';
import { Pool } from '../../../shared/pool/pool';
import { Observable } from 'rxjs';
import { Sowing } from '../../../shared/sowing/sowing';

@Component({
  selector: 'app-sowing-list',
  templateUrl: './sowing-list.component.html',
  styleUrls: ['./sowing-list.component.scss']
})
export class SowingListComponent implements OnInit {
  // Rows
  sowingRows = [];
  auxiliarRows = [];
  // Auxiliars
  selected = [];
  sowingsObservable: Observable<Sowing[]>;
  sowings = [];
  // Sowing's details
  sowingId: number;
  sowingNumberOfAnimals: number; 
  sowingInitialWeight: number;
  sowingDensityOfAnimals: number;
  sowingDate: number;
  sowingPool: Pool;
  sowingWaterParameters: number;
  sowingPathogens: number;
  sowingWaterAnalysis: number;
  sowingFoods: number;
  sowingFertilizer: number;
  sowingOperatingCost: number;

  constructor(private sowingService: SowingService) { }

  ngOnInit() {
    this.sowingService.getSowings()
                      .subscribe(
                        sowings => this.sowingRows = sowings,
                        err => console.log('error: ' + err));
    this.auxiliarRows = this.sowingRows;
  }
  onActivate(event) {
    if (event.type === 'dblclick') {
      this.sowingId = event.row.id;
      this.sowingNumberOfAnimals = event.row.sowingNumberOfAnimals;
      this.sowingInitialWeight = event.row.sowingInitialWeight;
      this.sowingDensityOfAnimals = event.row.sowingDensityOfAnimals;
      this.sowingDate = event.row.sowingDate;
      this.sowingPool = event.row.sowingPool.description;
      this.sowingWaterParameters = event.row.sowingWaterParameters;
      this.sowingPathogens = event.row.sowingPathogens;
      this.sowingWaterAnalysis = event.row.sowingWaterAnalysis;
      this.sowingFoods = event.row.sowingFoods;
      this.sowingFertilizer = event.row.sowingFertilizer;
      this.sowingOperatingCost = event.row.sowingOperatingCost;
    }
  }
  searchFilter(event) {
    const val = event.target.value.toLowerCase();
    console.log(val);
  }
  clean_modal() {
    this.sowingId = null;
    this.sowingNumberOfAnimals = null;
    this.sowingInitialWeight = null;
    this.sowingDensityOfAnimals = null;
    this.sowingDate = null;
    this.sowingPool = null;
    this.sowingWaterParameters = null;
    this.sowingPathogens = null;
    this.sowingWaterAnalysis = null;
    this.sowingFoods = null;
    this.sowingFertilizer = null;
    this.sowingOperatingCost = null;
  }
  // fetch(cb) {
  //   const request = new XMLHttpRequest();
  //   request.open('GET', `assets/data/sowings_data.json`);
  //   request.onload = () => cb(JSON.parse(request.response));
  //   request.send();
  // }
  // onSelect({ selected }) {
  //   this.selected.splice(0, this.selected.length);
  //   this.selected.push(...selected);
  //   console.log(this.selected);
  // }
  // add() {
  //   this.selected.push(this.sowingRows[1], this.sowingRows[3]);
  // }
  // update() {
  //   this.selected = [this.sowingRows[1], this.sowingRows[3]];
  // }
  // remove() {
  //   this.selected = [];
  // }
}
