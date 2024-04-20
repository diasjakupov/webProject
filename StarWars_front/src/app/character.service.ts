import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from './character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private apiUrl = 'https://swapi.dev/api/people/';

  constructor(private http: HttpClient) { }

  getCharacters(page: number, text: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?search=${text}&page=${page}`);
  }

  getCharacter(text: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?search=${text}`)
  }

  getCharacterById(url: string): Observable<Character>{
    return this.http.get<Character>(url);
  }
}
