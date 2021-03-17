import { Component, OnInit } from '@angular/core';
import {GameService} from '../../services/GameService';
import {NavigationEnd, Router} from '@angular/router';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public shouldHaveMiddle: boolean;
  constructor(public gameService: GameService, private router: Router) {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd), map(e => e as NavigationEnd))
      .subscribe(e => {
        this.shouldHaveMiddle = e.url === '/game';
    });
  }

  ngOnInit(): void {
  }

  deckSizeChanged(value: string): void {
    console.log(value);
    this.gameService.changeDeckSize(parseInt(value, 10));
  }
}
