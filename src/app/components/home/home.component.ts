import { Component, OnInit } from '@angular/core';
import {GameService} from '../../services/GameService';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public gameService: GameService, private router: Router) {
  }

  ngOnInit(): void {
  }

  startGame(): void {
    this.gameService.startGame();
    this.router.navigate(['game']).then();
  }

  deckSizeChanged(value: string): void {
    this.gameService.changeDeckSize(parseInt(value, 10));
  }
}
