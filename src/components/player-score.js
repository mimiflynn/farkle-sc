import React from 'react';
import classNames from 'classnames';

export function PlayerScore(props) {
    const player = props.player;
    const scorecard = props.scorecard;
    const select = props.select;

    function handleSelect() {
        select(player);
    }

    function renderNotOnBoard() {
        if (scorecard.total === 0) {
            return (
                <div className="alert alert-warning" role="alert">
                    A score of 500 is needed in one roll to be on the board.
                </div>
            )
        }
    }

    return (
        <div className={classNames('card', {
            'on-board': scorecard.onBoard
        })} key={player}>
            <div className="card-body">
                {renderNotOnBoard()}
                <h5 className="card-title">{player}</h5>
                <p className="card-text">Total: {scorecard.total}</p>
                <button
                    onClick={handleSelect}
                    className="btn btn-primary">
                    My turn
                </button>
            </div>
        </div>
    )
}