import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { PoolService } from '../../../services/pool/pool.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ITreeOptions } from 'angular-tree-component';

import swal from 'sweetalert2';

@Component({
  selector: 'app-sowing-create',
  templateUrl: './sowing-create.component.html',
  styleUrls: ['./sowing-create.component.scss',
    '../../../../assets/icon/icofont/css/icofont.scss',
    '../../../../../node_modules/angular-tree-component/dist/angular-tree-component.css'
  ], encapsulation: ViewEncapsulation.None
})
export class SowingCreateComponent implements OnInit {
  // Rows
  // Auxiliars
  pools = [];
  nodes = [];
  poolSelected: string;
  selectedTreeList = [];
  resources_list = [];
  resources_names = [];
  resources_prede = [];
  resource_prede_name = '';
  selected_group = [];
  // Sowing's details
  rows = [];
  tempRows = [];
  // Form Inputs
  newSowingForm: FormGroup;

  // wut

  myNumberForm: FormGroup;
  mytooltipForm: FormGroup;
  checkdropForm: FormGroup;

  submitted: boolean;

  selected = [];

  options: ITreeOptions = {
    useCheckbox: true
  };

  columns: any[] = [
    { name: 'Recurso Predeterminado', prop: 'name' }
  ];

  // /wut

  sowingDensityOfAnimals: any;
  sowingWaterParameters: any;
  sowingInitialWeight: any;
  sowingPathogens: any;
  sowingWaterAnalysis: any;
  sowingFoods: any;
  sowingFertilizer: any;
  sowingOperatingCost: any;

  constructor(private poolService: PoolService) { 
    const sowingDensityOfAnimals = new FormControl('', Validators.required);
    const sowingWaterParameters = new FormControl('', Validators.required);
    const sowingInitialWeight = new FormControl('', Validators.required);
    const sowingPathogens = new FormControl('', Validators.required);
    const sowingWaterAnalysis = new FormControl('', Validators.required);
    const sowingFoods = new FormControl('', Validators.required);
    const sowingFertilizer = new FormControl('', Validators.required);
    const sowingOperatingCost = new FormControl('', Validators.required);

    this.newSowingForm = new FormGroup({
      sowingDensityOfAnimals: sowingDensityOfAnimals,
      sowingWaterParameters: sowingWaterParameters,
      sowingInitialWeight: sowingInitialWeight,
      sowingPathogens: sowingPathogens,
      sowingWaterAnalysis: sowingWaterAnalysis,
      sowingFoods: sowingFoods,
      sowingFertilizer: sowingFertilizer,
      sowingOperatingCost: sowingOperatingCost
    });
  }

  ngOnInit() {
    this.poolService.getPools()
                    .subscribe(
                      pools => {
                        this.rows = pools;
                        this.pools = pools;
                        this.initNodes();
                      }, err => alert('nodes_error: ' + err));
  }

  onSubmit() {
    this.submitted = true;
  }

  getPoolValue(selectedValue) {
    this.poolService.getPool(selectedValue)
                    .subscribe(
                      pool => this.poolSelected = pool.code);
  }

  onSelect(event) {
    this.resources_list = [];
    this.resources_names = [];
    this.selectedTreeList = Object.entries(event.treeModel.selectedLeafNodeIds)
      .filter(([key, value]) => {
        return (value === true);
      }).map((node) => node[0]);
    for (const i of this.selectedTreeList) {
      this.resources_list.push(event.treeModel.getNodeById(i).data);
      this.resources_names.push(event.treeModel.getNodeById(i).data.name);
    }
  }

  onSelectTableResources({ selected }) {
    this.resources_prede = selected;
    this.resource_prede_name = selected[0].poolName;
  }

  onSelectGroup({ selected }) {
    this.selected_group.splice(0, this.selected_group.length);
    this.selected_group.push(...selected);
  }

  initNodes() {
    const node_temp = [];
    for (const com of this.pools) {
      node_temp.push({
        poolId: com._id,
        poolName: com.description
      });
    }
    this.nodes = node_temp;
    console.log(this.nodes)
  }
  createNewSowing() {
    alert("al toque perro");
  }
  openSuccessSwal() {
    swal({
      title: 'Nueva Siembra!',
      text: 'Guardado',
      type: 'success'
    }).catch(swal.noop);
  }
}
