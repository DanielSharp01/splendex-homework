import { Component, OnInit } from '@angular/core';
import {GameService} from '../../services/GameService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public shouldHaveMiddle: boolean;
  constructor(private gameService: GameService) {
    this.gameService.screen.subscribe(screen => {
      this.shouldHaveMiddle = screen === 'game';
    });
  }

  ngOnInit(): void {
  }

}
