import { Scores, DEFAULT_ON_BOARD_THRESHOLD, WIN_SCORE } from '@fsc/types';

export interface addPlayerProps {
    players: string[];
    newPlayer: string;
}

export function addPlayerReducer({ players, newPlayer }: addPlayerProps): string[] {
    return [...players, newPlayer];
}

export function editPlayerReducer({
    players,
    oldPlayer,
    newPlayer,
}: {
    players: string[];
    oldPlayer: string;
    newPlayer: string;
}): string[] {
    const newPlayers = players.slice();
    const index = players.indexOf(oldPlayer);
    newPlayers[index] = newPlayer;
    return newPlayers;
}

export function removePlayerReducer({
    players,
    player,
}: {
    players: string[];
    player: string;
}): string[] {
    const newPlayers = players.slice();
    const index = players.indexOf(player);
    newPlayers.splice(index, 1);
    return newPlayers;
}

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
    // if total drops below what was needed, player might no longer be "on board"
    // but we just recalculate from scratch
    const wasOnBoard = cardToUpdate.onBoard;
    // Player stays "on board" only if they had gotten on board and still have a positive total
    const stillOnBoard = wasOnBoard && newTotal > 0;

    const updatedScores: Scores = {
        ...scores,
        [player]: {
            turns: newTurns,
            total: stillOnBoard ? newTotal : 0,
            onBoard: stillOnBoard,
        },
    };

    return updatedScores;
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
