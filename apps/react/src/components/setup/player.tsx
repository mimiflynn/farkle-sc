import { type BaseSyntheticEvent, useCallback, useState } from 'react';

interface PlayerProps {
    handleEdit: (player: string, value: string) => void;
    handleRemove: (player: string) => void;
    player: string;
}

export function PlayerName({ player, handleEdit, handleRemove }: PlayerProps) {
    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState(player);

    const handleInputUpdate = useCallback((event: BaseSyntheticEvent) => {
        setValue(event.target.value);
    }, []);

    const handleAddPlayer = useCallback(
        (event: BaseSyntheticEvent) => {
            event.preventDefault();
            handleEdit(player, value);
            setEdit(false);
        },
        [handleEdit, player, value]
    );

    const handleEditPlayer = useCallback((event: BaseSyntheticEvent) => {
        event.preventDefault();
        setEdit(true);
    }, []);

    const handleRemovePlayer = useCallback(
        (event: BaseSyntheticEvent) => {
            event.preventDefault();
            handleRemove(player);
        },
        [handleRemove, player]
    );

    const editPlayer = (
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
                        className="btn btn-outline-secondary"
                        type="submit"
                        id="button-addon2"
                        onClick={handleAddPlayer}
                    >
                        Save
                    </button>
                </div>
            </div>
        </form>
    );

    const playerInput = (
        <div className="input-group mb-3">
            <input
                type="text"
                name="player"
                className="form-control"
                placeholder="Player"
                aria-label="Player"
                value={player as unknown as string}
                readOnly
            />
            <div className="input-group-append">
                <button
                    className="btn btn-outline-secondary"
                    type="submit"
                    id="button-addon2"
                    onClick={handleEditPlayer}
                >
                    Edit
                </button>
                <button
                    className="btn btn-outline-danger"
                    type="submit"
                    id="button-addon2"
                    onClick={handleRemovePlayer}
                >
                    Remove
                </button>
            </div>
        </div>
    );

    return edit ? editPlayer : playerInput;
}
