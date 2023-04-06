import { Scores } from '@fsc/types';

export const initialScorecard = {
    turns: [],
    total: 0,
    onBoard: false,
};

export function updateScores({
    scores,
    player,
    score,
}: {
    scores: Scores;
    player: string;
    score: number;
}): Scores {
    const cardToUpdate = scores[player];
    const updatedScores = {} as Scores;

    if (cardToUpdate.onBoard) {
        updatedScores[player] = {
            ...cardToUpdate,
            turns: [...cardToUpdate.turns, ...[score]],
            total: score + cardToUpdate.total,
        };
    } else if (score >= 500) {
        updatedScores[player] = {
            ...cardToUpdate,
            turns: [...cardToUpdate.turns, ...[score]],
            total: score,
            onBoard: true,
        };
    } else {
        updatedScores[player] = { ...cardToUpdate, turns: [...cardToUpdate.turns, ...[score]] };
    }

    return { ...scores, ...updatedScores };
}

export function initScorecards(players: string[]) {
    const scorecards: Scores = {};
    players.forEach((player) => {
        scorecards[player] = initialScorecard;
    });
    return scorecards;
}
