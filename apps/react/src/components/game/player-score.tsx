import { type Scorecard } from '@fsc/types';
import classNames from 'classnames';

interface PlayerScoreProps {
    player: string;
    scorecard: Scorecard;
}

export function PlayerScore({ player, scorecard }: PlayerScoreProps) {
    function renderBoardMessages() {
        if (scorecard.total === 0 && !scorecard.onBoard) {
            return (
                <div className="alert alert-warning" role="alert">
                    A score of 500 is needed in one roll to be on the board.
                </div>
            );
        }
    }

    function renderTurnHistory() {
        if (scorecard.turns.length >= 1) {
            const turnList = scorecard.turns.map((turn, index) => {
                const key = `${player}-turn-${index}`;
                return (
                    <li
                        className={classNames('list-group-item', {
                            'farkle-turn': turn === 0,
                        })}
                        key={key}
                    >
                        {turn === 0 ? 'FARKLE!' : turn}
                    </li>
                );
            });

            return (
                <div>
                    <h6>Turn History</h6>
                    <ul className="list-group list-group-flush">{turnList}</ul>
                </div>
            );
        }
    }

    return (
        <div
            className={classNames('card', {
                'on-board': scorecard.onBoard,
            })}
            key={player}
        >
            <div className="card-body">
                {renderBoardMessages()}
                <h5 className="card-title">{player}</h5>
                <p className="card-text">Total: {scorecard.total}</p>
                {renderTurnHistory()}
            </div>
        </div>
    );
}
