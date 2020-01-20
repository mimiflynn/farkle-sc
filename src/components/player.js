import React, { useState } from 'react';

export function Player(props) {
    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState(props.player);

    const handleInputUpdate = (event) => {
        setValue(event.target.value);
    }

    const handleAddPlayer = (event) => {
        event.preventDefault();
        props.handleEdit(props.player, value);
        setEdit(false);
    };

    const handleEditPlayer = (event) => {
        event.preventDefault();
        setEdit(true);
    };

    const editPlayer = (
        <form>
            <div className="input-group mb-3">
                <input
                    type="text"
                    name="player"
                    className="form-control" placeholder="Player"
                    aria-label="Player"
                    value={value}
                    onChange={handleInputUpdate} />
                <div className="input-group-append">
                    <button
                        className="btn btn-outline-secondary"
                        type="submit"
                        id="button-addon2"
                        onClick={handleAddPlayer}>
                        Save
                            </button>
                </div>
            </div>
        </form >
    );

    const player = (
        <div className="input-group mb-3">
            <input
                type="text"
                name="player"
                className="form-control" placeholder="Player"
                aria-label="Player"
                value={props.player}
                readOnly />
            <div className="input-group-append">
                <button
                    className="btn btn-outline-secondary"
                    type="submit"
                    id="button-addon2"
                    onClick={handleEditPlayer}>
                    edit
                 </button>
            </div>
        </div>
    );

    const renderPlayer = () => {
        if (edit) {
            return editPlayer;
        } else {
            return player;
        }
    }

    return renderPlayer();
}