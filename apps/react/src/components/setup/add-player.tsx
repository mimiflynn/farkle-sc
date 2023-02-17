import { BaseSyntheticEvent, useState } from 'react';

interface AddPlayerProps {
  handleSave: (player: string) => void;
}

export function AddPlayer({ handleSave }: AddPlayerProps) {
  const [value, setValue] = useState('');

  const handleInputUpdate = (event: BaseSyntheticEvent) => {
    setValue(event.target.value);
  };

  const handleAddPlayer = (event: BaseSyntheticEvent) => {
    event.preventDefault();
    handleSave(value);
    setValue('');
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
    </form>
  );
}
