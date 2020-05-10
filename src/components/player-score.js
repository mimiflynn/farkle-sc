import React from 'react';
import classNames from 'classnames';

export function PlayerScore(props) {
    const player = props.player;
    const scorecard = props.scorecard;

    function renderBoardMessages() {
        if (scorecard.total === 0) {
            return (
                <div className="alert alert-warning" role="alert">
                    A score of 500 is needed in one roll to be on the board.
                </div>
            )
        } else if (
            scorecard.total >= 500 &&
            (scorecard.turns.length === 1 ||
                scorecard.turns[scorecard.turns.length - 2] === 0)
        ) {
            return (
                <div className="alert alert-success" role="alert">
                    You are now on the board!
                </div>
            )
        }
    }

    return (
        <div className={classNames('card', {
            'on-board': scorecard.onBoard
        })} key={player}>
            <div className="card-body">
                {renderBoardMessages()}
                <h5 className="card-title">{player}</h5>
                <p className="card-text">Total: {scorecard.total}</p>
            </div>
        </div>
    )
}