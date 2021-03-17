import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() public image: 'angular' | 'd3' | 'jenkins' | 'postcss' | 'react' | 'redux' | 'sass' | 'splendex' | 'ts' | 'webpack';
  @Input() public state: 'hidden' | 'revealed' | 'removed' = 'hidden';

  constructor() { }

  ngOnInit(): void {
  }
}
