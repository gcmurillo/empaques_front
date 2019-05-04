import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
// import * as moment from 'moment';
// import { Move } from './shared/move/move';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Empaques Web';
  // move: Move =
  //   {
  //     id: 23,
  //     type: 'income',
  //     fecha: moment(),
  //     product: '1555',
  //   };

  constructor(private router: Router) {
    // // let moment = require('moment'); // add this 1 of 4
    // const now = moment(); // add this 2 of 4
    // // this.date = moment().format();
    // console.log('hello world', now);
    // // console.log('mi fecha', date); // add this 3 of 4
    // console.log('& dias despues', now.add(7, 'days').format()); // add this 4 of 4
    // this.move.date = moment();
    // console.log('hello world', this.move.date);
    // console.log('hello horld', this.move.fecha.format());
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
