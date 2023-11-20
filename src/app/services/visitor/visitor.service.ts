import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Visitor } from 'src/app/register/register.component';


@Injectable({
  providedIn: 'root'
})
export class VisitorService {

  constructor(private readonly http: HttpClient) { }

  getVisitors(): Observable<Visitor[]> {
    return this.http.get<Visitor[]>('/visitors/all');
  }

  submitVisitor(visitor: Visitor): void {
    this.http.post('/visitors/new', visitor).subscribe();
  }
}
