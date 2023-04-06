export interface Scorecard {
    turns: number[];
    total: number;
    onBoard: boolean;
}

export interface Scores {
    [key: string]: Scorecard;
}
