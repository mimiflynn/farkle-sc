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
