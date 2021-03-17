import { Component, OnInit } from '@angular/core';
import {GameService} from '../../services/GameService';
import {NgxSmartModalService} from 'ngx-smart-modal';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor(public gameService: GameService, private ngxSmartModalService: NgxSmartModalService) { }

  ngOnInit(): void {
  }

}
