import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Planet } from './planets';

@Injectable({
  providedIn: 'root'
})
export class PlanetsService {
  private apiUrl = 'https://swapi.dev/api/planets/';

  constructor(private http: HttpClient) { }

  getPlanets(page: number, text: string): Observable<any> {
    let url = `${this.apiUrl}?search=${text}&page=${page}`;
    return this.http.get<any>(url);
  }

  getPlanet(text: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?search=${text}`)
  }

  getPlanetById(url: string): Observable<Planet> {
    return this.http.get<Planet>(url)
  }
}
