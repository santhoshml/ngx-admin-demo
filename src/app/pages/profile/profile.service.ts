import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

const TOTAL_PAGES = 7;

export class NewsPost {
  title: string;
  link: string;
  creator: string;
  text: string;
}

@Injectable()
export class ProfileService {

  constructor(private http: HttpClient) {}

  loadProfile(key: string): Observable<any> {
    return this.http.get<any>(`assets/data/${key}.json`);
  }
}
