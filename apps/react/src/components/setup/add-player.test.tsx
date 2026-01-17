import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { AddPlayer } from './add-player';

describe('AddPlayer', () => {
    it('renders input and add button', () => {
        const handleSave = vi.fn();
        render(<AddPlayer handleSave={handleSave} />);

        expect(screen.getByPlaceholderText('Player')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
    });

    it('calls handleSave with player name when Add is clicked', async () => {
        const handleSave = vi.fn();
        const user = userEvent.setup();

        render(<AddPlayer handleSave={handleSave} />);

        const input = screen.getByPlaceholderText('Player');
        const addButton = screen.getByRole('button', { name: /add/i });

        await user.type(input, 'Alice');
        await user.click(addButton);

        expect(handleSave).toHaveBeenCalledWith('Alice');
    });

    it('clears input after adding a player', async () => {
        const handleSave = vi.fn();
        const user = userEvent.setup();

        render(<AddPlayer handleSave={handleSave} />);

        const input = screen.getByPlaceholderText('Player') as HTMLInputElement;
        const addButton = screen.getByRole('button', { name: /add/i });

        await user.type(input, 'Bob');
        await user.click(addButton);

        expect(input.value).toBe('');
    });

    it('allows adding empty player name', async () => {
        const handleSave = vi.fn();
        const user = userEvent.setup();

        render(<AddPlayer handleSave={handleSave} />);

        const addButton = screen.getByRole('button', { name: /add/i });
        await user.click(addButton);

        expect(handleSave).toHaveBeenCalledWith('');
    });
});
