import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Starship } from './starship';

@Injectable({
  providedIn: 'root'
})
export class StarshipService {

  private apiUrl = 'https://swapi.dev/api/starships/';

  constructor(private http: HttpClient) { }

  getStarships(page: number, text: string): Observable<any>{
    let url = `${this.apiUrl}?search=${text}&page=${page}`
    return this.http.get<any>(url);
  }

  getStarship(text: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?search=${text}`)
  }

  getStarshipById(url: string): Observable<Starship> {
    return this.http.get<Starship>(url);
  }
}
