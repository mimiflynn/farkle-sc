import { Scores, DEFAULT_ON_BOARD_THRESHOLD, WIN_SCORE } from '@fsc/types';

export const initialScorecard = {
    turns: [],
    total: 0,
    onBoard: false,
};

export function updateScores({
    scores,
    player,
    score,
    onBoardThreshold = DEFAULT_ON_BOARD_THRESHOLD,
}: {
    scores: Scores;
    player: string;
    score: number;
    onBoardThreshold?: number;
}): Scores {
    const cardToUpdate = scores[player];
    const updatedScores = {} as Scores;

    if (cardToUpdate.onBoard) {
        updatedScores[player] = {
            ...cardToUpdate,
            turns: [...cardToUpdate.turns, ...[score]],
            total: score + cardToUpdate.total,
        };
    } else if (score >= onBoardThreshold) {
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

export function undoLastScore({ scores, player }: { scores: Scores; player: string }): Scores {
    const cardToUpdate = scores[player];
    if (cardToUpdate.turns.length === 0) {
        return scores;
    }

    const newTurns = cardToUpdate.turns.slice(0, -1);
    const newTotal = newTurns.reduce((sum, t) => sum + t, 0);
    const wasOnBoard = cardToUpdate.onBoard;
    const stillOnBoard = wasOnBoard && newTotal > 0;

    return {
        ...scores,
        [player]: {
            turns: newTurns,
            total: stillOnBoard ? newTotal : 0,
            onBoard: stillOnBoard,
        },
    };
}

export function getWinner(scores: Scores): string | null {
    for (const player of Object.keys(scores)) {
        if (scores[player].total >= WIN_SCORE) {
            return player;
        }
    }
    return null;
}

export function initScorecards(players: string[]) {
    const scorecards: Scores = {};
    players.forEach((player) => {
        scorecards[player] = initialScorecard;
    });
    return scorecards;
}
