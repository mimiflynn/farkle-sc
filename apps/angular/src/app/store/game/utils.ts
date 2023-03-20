import { Scores } from '@fsc/types/types';

export const initialScorecard = {
    turns: [],
    total: 0,
    onBoard: false,
};

export function setScoreReducer({
    currentPlayer,
    newScore,
}: {
    currentPlayer: number;
    newScore: number;
}) {
    console.log('current player', currentPlayer);
    console.log('setScoreReducer', newScore);
    return {};
}

export function initScorecards(players: string[]) {
    const scorecards: Scores = {};
    players.forEach((player) => {
        scorecards[player] = initialScorecard;
    });
    return scorecards;
}
