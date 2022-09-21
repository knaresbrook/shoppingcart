import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  public currentMessageSubject: BehaviorSubject<number>;
  public currentMessage: Observable<number>;
  public qty = 0;

  constructor() {
    this.currentMessageSubject = new BehaviorSubject<number>(0);
    this.currentMessage = this.currentMessageSubject.asObservable();
  }

  public get getMessage() {
    return this.currentMessageSubject.value;
  }
}
