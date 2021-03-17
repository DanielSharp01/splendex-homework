import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  public image: 'angular' | 'd3' | 'jenkins' | 'postcss' | 'react' | 'redux' | 'sass' | 'splendex' | 'ts' | 'webpack';

  constructor() { }

  ngOnInit(): void {
  }
}
