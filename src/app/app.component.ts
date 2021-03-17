import { Component } from '@angular/core';
import {GameService} from './services/GameService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'splendex-homework';
  currentScreen: 'home' | 'game';

  constructor(private gameService: GameService) {
    this.gameService.screen.subscribe(screen => this.currentScreen = screen);
  }
}
