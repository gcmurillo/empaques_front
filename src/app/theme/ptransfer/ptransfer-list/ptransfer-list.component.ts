import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ptransfer-list',
  templateUrl: './ptransfer-list.component.html',
  styleUrls: ['./ptransfer-list.component.scss']
})
export class PtransferListComponent implements OnInit {

  stackingAreaChartData = {
    chartType: 'AreaChart',
    dataTable: [
      ['Year', 'Animales activos', 'Animales cosechados'],
      ['Julio', 1000, 400],
      ['Agosto', 1170, 460],
      ['Septiembre', 660, 1120],
      ['Octubre', 1030, 540]
    ],
    options: {
      isStacked: true,
      height: 300,
      legend: { position: 'top', maxLines: 3 },
      vAxis: { minValue: 0 },
      colors: ['#2ecc71', '#5faee3']
    },
  };

  barChartData = {
    chartType: 'BarChart',
    dataTable: [
      ['City', '2010 Population', '2000 Population'],
      ['New York City, NY', 8175000, 8008000],
      ['Los Angeles, CA', 3792000, 3694000],
      ['Chicago, IL', 2695000, 2896000],
      ['Houston, TX', 2099000, 1953000],
      ['Philadelphia, PA', 1526000, 1517000]
    ],
    options: {
      height: 300,
      title: 'Population of Largest U.S. Cities',
      chartArea: { width: '50%' },
      isStacked: true,
      hAxis: {
        title: 'Total Population',
        minValue: 0,
      },
      vAxis: {
        title: 'City'
      },
      colors: ['#2ecc71', '#5faee3']
    },
  };

  donutChartData = {
    chartType: 'PieChart',
    dataTable: [
      ['Tarea', 'Cosechas por Usuarios'],
      ['Usuario 2', 11],
      ['Usuario 3', 2],
      ['Usuario 4', 2],
      ['Usuario 5', 2],
      ['Usuario 6', 7]
    ],
    options: {
      height: 300,
      title: 'My Daily Activities',
      pieHole: 0.4,
      colors: ['#2ecc71', '#01C0C8', '#FB9678', '#5faee3', '#f4d03f']
    },
  };

  constructor() { }

  ngOnInit() {
  }

}
