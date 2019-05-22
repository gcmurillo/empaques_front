import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
// import { EmpaquesListComponent } from '../theme/empaques/empaques-list/empaques-list.component';
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
    rootPage: any;

    constructor(private router: Router) {
        // if (localStorage.getItem('usetToken') === null) {
        //     this.rootPage = EmpaquesListComponent;
        // }
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
