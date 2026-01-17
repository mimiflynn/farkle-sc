import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { PlayerName } from './player';

describe('PlayerName', () => {
    it('renders player name in input', () => {
        const handleEdit = vi.fn();
        const handleRemove = vi.fn();

        render(
            <PlayerName
                player="Alice"
                handleEdit={handleEdit}
                handleRemove={handleRemove}
            />
        );

        expect(screen.getByDisplayValue('Alice')).toBeInTheDocument();
    });

    it('renders edit and remove buttons', () => {
        const handleEdit = vi.fn();
        const handleRemove = vi.fn();

        render(
            <PlayerName
                player="Alice"
                handleEdit={handleEdit}
                handleRemove={handleRemove}
            />
        );

        expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /remove/i })).toBeInTheDocument();
    });

    it('shows input field when edit is clicked', async () => {
        const handleEdit = vi.fn();
        const handleRemove = vi.fn();
        const user = userEvent.setup();

        render(
            <PlayerName
                player="Alice"
                handleEdit={handleEdit}
                handleRemove={handleRemove}
            />
        );

        const editButton = screen.getByRole('button', { name: /edit/i });
        await user.click(editButton);

        expect(screen.getByDisplayValue('Alice')).toBeInTheDocument();
    });

    it('calls handleEdit with old and new player names', async () => {
        const handleEdit = vi.fn();
        const handleRemove = vi.fn();
        const user = userEvent.setup();

        render(
            <PlayerName
                player="Alice"
                handleEdit={handleEdit}
                handleRemove={handleRemove}
            />
        );

        const editButton = screen.getByRole('button', { name: /edit/i });
        await user.click(editButton);

        const input = screen.getByDisplayValue('Alice');
        await user.clear(input);
        await user.type(input, 'Alicia');

        const saveButton = screen.getByRole('button', { name: /save/i });
        await user.click(saveButton);

        expect(handleEdit).toHaveBeenCalledWith('Alice', 'Alicia');
    });

    it('calls handleRemove when remove is clicked', async () => {
        const handleEdit = vi.fn();
        const handleRemove = vi.fn();
        const user = userEvent.setup();

        render(
            <PlayerName
                player="Alice"
                handleEdit={handleEdit}
                handleRemove={handleRemove}
            />
        );

        const removeButton = screen.getByRole('button', { name: /remove/i });
        await user.click(removeButton);

        expect(handleRemove).toHaveBeenCalledWith('Alice');
    });
});
