import { type Scorecard } from '@fsc/types';
import { type BaseSyntheticEvent, useCallback, useState } from 'react';

interface EditPlayerScoreProps {
    handleSave: (score: number) => void;
    player: string;
    scorecard: Scorecard;
}

export function EditPlayerScore({ handleSave, player, scorecard }: EditPlayerScoreProps) {
    const [value, setValue] = useState(0);

    const handleInputUpdate = useCallback((event: BaseSyntheticEvent) => {
        setValue(Number(event.target.value));
    }, []);

    const handleSetScore = useCallback(
        (event: BaseSyntheticEvent) => {
            event.preventDefault();
            handleSave(value);
            setValue(0);
        },
        [handleSave, value]
    );

    return (
        <div key={player} className={scorecard.onBoard ? 'on-board' : 'off-board'}>
            <h3>{player}</h3>
            <form>
                <div className="input-group mb-3">
                    <input
                        type="number"
                        name="score"
                        className="form-control"
                        placeholder="Score"
                        aria-label="Score"
                        value={value}
                        onChange={handleInputUpdate}
                    />
                    <div className="input-group-append">
                        <button className="btn btn-success" type="submit" onClick={handleSetScore}>
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
