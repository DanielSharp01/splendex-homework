export type CardImage = 'angular' | 'd3' | 'jenkins' | 'postcss' | 'react' | 'redux' | 'sass' | 'splendex' | 'ts' | 'webpack';
export interface Card {
  image: CardImage;
  state: 'hidden' | 'revealed' | 'removed';
}
