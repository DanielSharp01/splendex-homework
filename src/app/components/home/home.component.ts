import {Component} from '@angular/core';
import {GameService} from '../../services/GameService';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(public gameService: GameService, private router: Router) {
  }

  startGame(): void {
    this.gameService.startGame();
    this.router.navigate(['game']).then();
  }

  deckSizeChanged(value: number): void {
    this.gameService.changeDeckSize(value);
  }
}
