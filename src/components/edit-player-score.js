import React, { useState } from 'react';

export function EditPlayerScore(props) {
    const player = props.player;
    const scorecard = props.scorecard;
    const [value, setValue] = useState('');

    function handleInputUpdate(event) {
        setValue(event.target.value);
    }

    function handleSetScore(event) {
        event.preventDefault();
        props.handleSave(value);
        setValue('');
    };

    return (
        <div key={player}
            className={scorecard.onBoard ? 'on-board' : 'off-board'}>
            <h3>{player}</h3>
            <div>Total: {scorecard.total}</div>
            <form>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        name="score"
                        className="form-control" placeholder="Score"
                        aria-label="Score"
                        value={value}
                        onChange={handleInputUpdate} />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="submit"
                            id="button-addon2"
                            onClick={handleSetScore}>
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}