import React, { useState } from 'react';

export function AddPlayer(props) {
    const [value, setValue] = useState('');

    const handleInputUpdate = (event) => {
        setValue(event.target.value);
    }

    const handleAddPlayer = (event) => {
        event.preventDefault();
        props.handleSave(value);
        setValue('');
    };

    return (
        <form>
            <div className="input-group mb-3">
                <input type="text"
                    name="player" className="form-control" placeholder="Player" aria-label="Player"
                    value={value} onChange={handleInputUpdate} />
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="submit" id="button-addon2" onClick={handleAddPlayer}>Add</button>
                </div>
            </div>
        </form>
    );
}