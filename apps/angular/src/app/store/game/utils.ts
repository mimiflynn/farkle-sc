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
