export function updateScoreCard(cardToUpdate) {
    const updatedScoreCard = {};
    const total = parseInt(score, 10) + cardToUpdate.total;

    updatedScoreCard = Object.assign({}, cardToUpdate, {
        turns: [...cardToUpdate.turns, ...[score]],
        total,
        onBoard: !cardToUpdate.onBoard ? (parseInt(score, 10) + cardToUpdate.total) > 500 : true
    });

    return updatedScoreCard;
}