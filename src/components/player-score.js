import React from 'react';
import classNames from 'classnames';

export function PlayerScore(props) {
    const player = props.player;
    const scorecard = props.scorecard;
    const select = props.select;

    function handleSelect() {
        select(player);
    }

    return (
        <div className={classNames('card', {
            'off-board': !player.onBoard,
            'on-board': player.onBoard
        })} key={player}>
            <div className="card-body">
                <h5 className="card-title">{player}</h5>
                <p className="card-text">Total: {scorecard.total}</p>
                <p className="card-text">On the board: {scorecard.onBoard}</p>
                <button
                    onClick={handleSelect}
                    className="btn btn-primary">
                    My turn
                        </button>
            </div>
        </div>
    )
}