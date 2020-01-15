import React from 'react';

export function AddPlayer(props) {
    const getInput = () => {

    }

    const handleAddPlayer = () => {
        props.handleSave();
    };

    return (
        <form>
            <div className="input-group mb-3">
                <input type="text" name="player" className="form-control" placeholder="Player" aria-label="Player" aria-describedby="button-addon2" />
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="submit" id="button-addon2" onClick={handleAddPlayer}>Add</button>
                </div>
            </div>
        </form>
    );
}