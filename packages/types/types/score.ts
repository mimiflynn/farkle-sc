export interface Scorecard {
  turns: [];
  total: number;
  onBoard: boolean;
}

export interface Scores {
  [key: string]: Scorecard;
}
