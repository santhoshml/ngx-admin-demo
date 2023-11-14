import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Injectable()
export class AdminService {

  constructor(private http: HttpClient) {}

  load(): Observable<any> {
    return this.http
      .get<any>('assets/data/admin.json');
  }
}
