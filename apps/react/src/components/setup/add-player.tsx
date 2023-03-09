import { BaseSyntheticEvent, useState } from 'react';
import { Player } from '@fsc/types';

interface AddPlayerProps {
  handleSave: (player: Player) => void;
}

export function AddPlayer({ handleSave }: AddPlayerProps) {
  const [value, setValue] = useState('' as unknown as Player);

  const handleInputUpdate = (event: BaseSyntheticEvent) => {
    setValue(event.target.value);
  };

  const handleAddPlayer = (event: BaseSyntheticEvent) => {
    event.preventDefault();
    handleSave(value);
    setValue('' as unknown as Player);
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
          value={value as unknown as string}
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
    </form>
  );
}
