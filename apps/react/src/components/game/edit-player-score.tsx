import { type Scorecard } from '@fsc/types';
import { type BaseSyntheticEvent, useCallback, useEffect, useRef, useState } from 'react';

interface EditPlayerScoreProps {
    handleSave: (score: number) => void;
    player: string;
    scorecard: Scorecard;
}

export function EditPlayerScore({ handleSave, player, scorecard }: EditPlayerScoreProps) {
    const [value, setValue] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-focus and select the score input when the player changes
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [player]);

    const handleInputUpdate = useCallback((event: BaseSyntheticEvent) => {
        const num = Number(event.target.value);
        setValue(num < 0 ? 0 : num);
    }, []);

    const handleSetScore = useCallback(
        (event: BaseSyntheticEvent) => {
            event.preventDefault();
            handleSave(value);
            setValue(0);
        },
        [handleSave, value]
    );

    const handleFarkle = useCallback(
        (event: BaseSyntheticEvent) => {
            event.preventDefault();
            handleSave(0);
            setValue(0);
        },
        [handleSave]
    );

    return (
        <div key={player} className={scorecard.onBoard ? 'on-board' : 'off-board'}>
            <h3>{player}</h3>
            <form>
                <div className="input-group mb-3">
                    <input
                        ref={inputRef}
                        type="number"
                        name="score"
                        className="form-control"
                        placeholder="Score"
                        aria-label="Score"
                        min="0"
                        value={value}
                        onChange={handleInputUpdate}
                    />
                    <div className="input-group-append">
                        <button className="btn btn-success" type="submit" onClick={handleSetScore}>
                            Save
                        </button>
                        <button className="btn btn-danger" type="button" onClick={handleFarkle}>
                            Farkle!
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
