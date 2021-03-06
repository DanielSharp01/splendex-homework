import {Component} from '@angular/core';
import {GameService} from '../../services/GameService';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  constructor(public gameService: GameService) { }
}
