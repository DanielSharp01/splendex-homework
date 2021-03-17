import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Card, CardImage} from '../model/Card';
import {distinctUntilChanged, map, mergeMap} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GameService {
  private _screen = new BehaviorSubject<'home' | 'game'>('home');
  private _cards = new BehaviorSubject<Array<Card> | null>(null);
  private _tries = new BehaviorSubject<number>(0);
  private _best = new BehaviorSubject<Array<number | null>>([null, null, null, null, null, null, null, null]);
  private _deckSize = new BehaviorSubject<number>(20);
  private _deckSizeIndex = new BehaviorSubject<number | null>(null);
  private pickEnabled = true;

  public readonly deckSizes = [6, 8, 10, 12, 14, 16, 18, 20];
  public readonly images: Array<CardImage> = [
    'angular', 'd3', 'jenkins', 'postcss', 'react', 'redux', 'sass', 'splendex', 'ts', 'webpack'];

  constructor() {
    this.loadFromStorage();

    this._screen.pipe(distinctUntilChanged()).subscribe(screen => localStorage.setItem('screen', screen));
    this._cards.pipe(distinctUntilChanged()).subscribe(cards => localStorage.setItem('cards', JSON.stringify(cards)));
    this._tries.pipe(distinctUntilChanged()).subscribe(tries => localStorage.setItem('tries', tries.toString()));
    this._best.pipe(distinctUntilChanged()).subscribe(best => localStorage.setItem('best', JSON.stringify(best)));
    this._deckSize.pipe(distinctUntilChanged()).subscribe(deckSize => localStorage.setItem('deckSize', deckSize.toString()));
    this._deckSizeIndex.pipe(distinctUntilChanged())
      .subscribe(deckSizeIndex => localStorage.setItem('deckSizeIndex', deckSizeIndex?.toString()));
  }

  public loadFromStorage(): void {
    const screen = localStorage.getItem('screen') as 'home' | 'game';
    const cards = localStorage.getItem('cards');
    const tries = localStorage.getItem('tries');
    const best = localStorage.getItem('best');
    const deckSize = localStorage.getItem('deckSize');
    const deckSizeIndex = localStorage.getItem('deckSizeIndex');
    if (screen) { this._screen.next(screen); }
    if (cards) {
      try {
        this._cards.next(JSON.parse(cards));
      } catch (e) {
        console.error('cards could not be parsed from local storage');
      }
    }
    if (tries) {
      try {
        this._tries.next(parseInt(tries, 10));
      }
      catch (e) {
        console.error('tries could not be parsed from local storage');
      }
    }
    if (best) {
      try {
        this._best.next(JSON.parse(best));
      }
      catch (e) {
        console.error('best could not be parsed from local storage');
      }
    }
    if (deckSize) {
      try {
        this._deckSize.next(parseInt(deckSize, 10));
      }
      catch (e) {
        console.error('deckSize could not be parsed from local storage');
      }
    }
  }

  public get screen(): Observable<'home' | 'game'> {
    return this._screen.asObservable();
  }

  public get cards(): Observable<Array<Card> | null> {
    return this._cards.asObservable();
  }

  public get tries(): Observable<number> {
    return this._tries.asObservable();
  }

  public get best(): Observable<number> {
    return this._best.pipe(mergeMap(b => this._deckSizeIndex.pipe(map(dsi => b[dsi]))));
  }

  public get deckSize(): Observable<number> {
    return this._deckSize.asObservable();
  }

  public changeDeckSize(value: number): void {
    this._deckSize.next(value);
  }

  public startGame(): void {
    this._screen.next('game');
    this._deckSizeIndex.next(this.deckSizes.findIndex(d => d === this._deckSize.value));
    this._cards.next(this.generateCards());
    this._tries.next(0);
  }

  private generateCards(): Array<Card> {
    const cards: Array<Card | null> = Array(this._deckSize.value).fill(null);
    const pickedImages = Array(this.images.length).fill(false);
    for (let i = 0; i < this._deckSize.value / 2; i++) {
      const setRandomCard = (image: CardImage) => {
        let index = Math.floor(Math.random() * this._deckSize.value);
        while (cards[index] !== null) {
          index = Math.floor(Math.random() * this._deckSize.value);
        }
        cards[index] = { image, state: 'hidden' };
      };

      let imageIndex = Math.floor(Math.random() * this._deckSize.value / 2);
      while (pickedImages[imageIndex]) {
        imageIndex = Math.floor(Math.random() * this._deckSize.value / 2);
      }
      pickedImages[imageIndex] = true;
      setRandomCard(this.images[imageIndex]);
      setRandomCard(this.images[imageIndex]);
    }

    return cards;
  }

  public pickCard(index: number): void {
    if (!this.pickEnabled) { return; }
    const cards = [...this._cards.value];
    if (cards[index].state !== 'hidden') { return; }
    cards[index].state = 'revealed';
    const revealedCards = cards.filter(c => c.state === 'revealed');
    if (revealedCards.length === 2) {
      if (revealedCards[0].image === revealedCards[1].image) {
        this._tries.next(this._tries.value + 1);
        this.pickEnabled = false;
        revealedCards[0].state = 'removed';
        revealedCards[1].state = 'removed';
        this._cards.next([...cards]);

        if (cards.filter(c => c.state === 'hidden').length === 0) {
          alert('You win!');
          if (!this._best.value[this._deckSizeIndex.value] || this._best.value[this._deckSizeIndex.value] > this._tries.value) {
            const newBest = [...this._best.value];
            newBest[this._deckSizeIndex.value] = this._tries.value;
            this._best.next(newBest);
          }
        }

        this.pickEnabled = true;
      } else {
        this._tries.next(this._tries.value + 1);
        this.pickEnabled = false;
        // Wait a little so the user knows that they picked wrong
        setTimeout(() => {
          revealedCards[0].state = 'hidden';
          revealedCards[1].state = 'hidden';
          this._cards.next([...cards]);
          this.pickEnabled = true;
        }, 1000);
      }
    }
    this._cards.next(cards);
  }

  restart(): void {
    this._screen.next('home');
  }
}
