import {Component, OnDestroy, Input, OnInit} from '@angular/core';
import { NbThemeService, NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators' ;
import { SolarData } from '../../@core/data/solar';
import { NewsService } from '../layout/news.service';
import { ProfileService } from './profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HostListener } from '@angular/core';
import { AdminService } from '../forms/form-admin/admin.service';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  name: string;
  size: string;
  kind: string;
  items?: number;
}

@Component({
  selector: 'ngx-profile',
  styleUrls: ['./profile.component.scss'],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnDestroy, OnInit {

  private alive = true;

  // tree module
  customColumn = 'name';
  defaultColumns = [ 'size', 'kind', 'items' ];
  allColumns = [ this.customColumn, ...this.defaultColumns ];

  dataSource: NbTreeGridDataSource<FSEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;


  reportsData: TreeNode<FSEntry>[];

  // appointment module
  currentApptSteps;
  pastApptList;
  medicationsList;

  solarValue: number;

  firstCard = {
    news: [],
    placeholders: [],
    loading: false,
    pageToLoadNext: 1,
  };
  pageSize = 10;

  user='nick';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private themeService: NbThemeService,
              private solarService: SolarData,
              private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>,
              private newsService: NewsService,
              private profileService: ProfileService,
              private adminService: AdminService) {
  
    let adminObject = sessionStorage.getItem("adminSettings");
    if(!adminObject){
      this.adminService.load().subscribe((data)=>{
        sessionStorage.setItem("adminSettings", JSON.stringify(data));
      });
    }

    this.solarService.getSolarData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((data) => {
        this.solarValue = data;
      });
  }

  setElementOrder(){
    let adminObject = JSON.parse(sessionStorage.getItem("adminSettings"));
    let sortedArray = this.sortObject(adminObject);

    const appointment_section = document.getElementById("appointment_section");
    const medication_section = document.getElementById("medication_section");
    const lab_results_section = document.getElementById("lab_results_section");
    const news_letters_section = document.getElementById("news_letters_section");

    const parent = document.getElementById("parent") // appointment_section.parentNode;

    //remove all children
    while(parent.firstChild){
      parent.removeChild(parent.lastChild);
    }
    for(let ele of sortedArray){
      switch (ele) {
        case 'appointment_section':
          if(appointment_section) parent.appendChild(appointment_section);      
          break;
        case 'medication_section':
          if(medication_section) parent.appendChild(medication_section);      
          break;
        case 'news_letters_section':
          if(news_letters_section) parent.appendChild(news_letters_section);      
          break;
        case 'lab_results_section':
          if(lab_results_section) parent.appendChild(lab_results_section);      
          break;
      }
    }
  }

  sortObject(adminObject: any) {
    let arr=[];
    for(let i=1; i<5; i++){
      if(i == parseInt(adminObject["appointment_section"].position) && adminObject["appointment_section"].visible) {
        arr.push("appointment_section");
      } else if(i == parseInt(adminObject["medication_section"].position) && adminObject["medication_section"].visible) {
        arr.push("medication_section");
      } else if(i == parseInt(adminObject["news_letters_section"].position) && adminObject["news_letters_section"].visible) {
        arr.push("news_letters_section");
      } else if(i == parseInt(adminObject["lab_results_section"].position) && adminObject["lab_results_section"].visible) {
        arr.push("lab_results_section");
      }
    }
    return arr;
  }

  ngOnInit(){    
    this.user = this.route.snapshot.queryParams?.user;
    if(!this.user) {
      this.user = 'nick';
    }
    
    this.profileService.loadProfile(this.user)
      .subscribe(data => {
        this.reportsData = data.data.reportsData;
        this.currentApptSteps = data.data.currentApptSteps;
        this.pastApptList = data.data.pastApptList;
        this.medicationsList = data.data.medicationsList;
        this.dataSource = this.dataSourceBuilder.create(this.reportsData);
      });

      this.setElementOrder();
  }

  ngOnDestroy() {
    this.alive = false;
  }

  loadNext(cardData) {
    if (cardData.loading) { return; }

    cardData.loading = true;
    cardData.placeholders = new Array(this.pageSize);
    this.newsService.load(cardData.pageToLoadNext, this.pageSize)
      .subscribe(nextNews => {
        cardData.placeholders = [];
        cardData.news.push(...nextNews);
        cardData.loading = false;
        cardData.pageToLoadNext++;
      });
  }

  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }

  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }
}

@Component({
  selector: 'ngx-fs-icon',
  template: `
    <nb-tree-grid-row-toggle [expanded]="expanded" *ngIf="isDir(); else fileIcon">
    </nb-tree-grid-row-toggle>
    <ng-template #fileIcon>
      <nb-icon icon="file-text-outline"></nb-icon>
    </ng-template>
  `,
})

export class FsIconComponent {
  @Input() kind: string;
  @Input() expanded: boolean;

  isDir(): boolean {
    return this.kind === 'dir';
  }
}
