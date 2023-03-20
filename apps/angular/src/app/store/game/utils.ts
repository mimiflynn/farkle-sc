import { Scorecard, Scores } from '@fsc/types/types';

export const initialScorecard = {
    turns: [],
    total: 0,
    onBoard: false,
};

export function setPlayerScore({
    scorecard,
    score,
}: {
    scorecard: Scorecard;
    score: number;
}): Scorecard {
    return { ...scorecard, turns: [...scorecard.turns, score], total: scorecard.total + score };
}

export function initScorecards(players: string[]) {
    const scorecards: Scores = {};
    players.forEach((player) => {
        scorecards[player] = initialScorecard;
    });
    return scorecards;
}
