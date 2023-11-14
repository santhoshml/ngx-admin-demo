import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

import { MENU_ITEMS } from './pages-menu';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit{

  menu: NbMenuItem[];
  constructor(private route: ActivatedRoute,
    private router: Router){

  }
  ngOnInit(): void {
    let adminElement: NbMenuItem[] =  [{
      title: 'Admin',
      icon: 'person-done-outline',
      link: '/pages/forms/admin',
      home: true,
    }];

    let user = this.route.snapshot.queryParams?.user;
    if(!user) {
      user = 'nick';
    }

    if(user === 'nick'){
      this.menu = [...MENU_ITEMS, ...adminElement];
    } else {
      this.menu = MENU_ITEMS;
    }
  }

  

  
  
  

}
