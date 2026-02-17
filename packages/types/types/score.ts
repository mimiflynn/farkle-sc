export interface Scorecard {
    turns: number[];
    total: number;
    onBoard: boolean;
}

export interface Scores {
    [key: string]: Scorecard;
}

export const WIN_SCORE = 10000;
export const DEFAULT_ON_BOARD_THRESHOLD = 500;
