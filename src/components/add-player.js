import React from 'react';

export function AddPlayer(props) {
    const handleAddPlayer = () => {
        props.handleSave();
    };

    return (
        <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Player" aria-label="Player" aria-describedby="button-addon2" />
            <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={handleAddPlayer}>Add</button>
            </div>
        </div>
    );
}