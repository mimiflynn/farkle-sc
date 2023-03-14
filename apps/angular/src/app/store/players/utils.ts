import { Players } from '@fsc/types';

export interface addPlayerProps {
    players: Players;
    newPlayer: string;
}

export function addPlayerReducer({ players, newPlayer }: addPlayerProps): Players {
    return [...players, newPlayer];
}

export function editPlayerReducer({
    players,
    oldPlayer,
    newPlayer,
}: {
    players: Players;
    oldPlayer: string;
    newPlayer: string;
}): Players {
    const newPlayers = players.slice();
    const index = players.indexOf(oldPlayer);
    newPlayers[index] = newPlayer;
    return newPlayers;
}

export function removePlayerReducer({
    players,
    player,
}: {
    players: Players;
    player: string;
}): Players {
    const newPlayers = players.slice();
    const index = players.indexOf(player);
    newPlayers.splice(index, 1);
    return newPlayers;
}