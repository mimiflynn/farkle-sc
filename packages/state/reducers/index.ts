import { Scores } from '@fsc/types';

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
