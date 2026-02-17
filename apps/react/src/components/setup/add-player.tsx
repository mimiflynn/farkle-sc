import { type BaseSyntheticEvent, useState } from 'react';

interface AddPlayerProps {
    handleSave: (player: string) => void;
    existingPlayers?: string[];
}

export function AddPlayer({ handleSave, existingPlayers = [] }: AddPlayerProps) {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');

    const handleInputUpdate = (event: BaseSyntheticEvent) => {
        setValue(event.target.value);
        setError('');
    };

    const handleAddPlayer = (event: BaseSyntheticEvent) => {
        event.preventDefault();
        const trimmed = value.trim();
        if (!trimmed) {
            setError('Player name cannot be empty');
            return;
        }
        if (existingPlayers.some((p) => p.toLowerCase() === trimmed.toLowerCase())) {
            setError('Player name already exists');
            return;
        }
        handleSave(trimmed);
        setValue('');
        setError('');
    };

    return (
        <form>
            <div className="input-group mb-3">
                <input
                    type="text"
                    name="player"
                    className="form-control"
                    placeholder="Player"
                    aria-label="Player"
                    value={value}
                    onChange={handleInputUpdate}
                />
                <div className="input-group-append">
                    <button
                        className="btn btn-secondary"
                        type="submit"
                        id="button-addon2"
                        onClick={handleAddPlayer}
                    >
                        Add
                    </button>
                </div>
            </div>
            {error && <div className="text-danger small mb-2">{error}</div>}
        </form>
    );
}
