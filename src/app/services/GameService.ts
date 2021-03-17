import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GameService {
  private _screen = new BehaviorSubject<'home' | 'game'>('home');
  public get screen(): BehaviorSubject<'home' | 'game'> {
    return this._screen;
  }
}
