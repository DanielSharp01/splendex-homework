import { Component, OnInit } from '@angular/core';
import {GameService} from '../../services/GameService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public gameService: GameService) {
  }

  ngOnInit(): void {
  }

  deckSizeChanged(value: string): void {
    this.gameService.changeDeckSize(parseInt(value, 10));
  }
}
