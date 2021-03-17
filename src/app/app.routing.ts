import {Route} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {GameComponent} from './components/game/game.component';

export const routes: Array<Route> = [
  { component: HomeComponent, path: '' },
  { component: GameComponent, path: 'game' }
];
