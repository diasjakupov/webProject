import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataSubject = new BehaviorSubject<string>('');

  setData(data: string) {
    this.dataSubject.next(data);
    console.log(this.dataSubject)
  }

  getData() {
    return this.dataSubject.asObservable();
  }
}
