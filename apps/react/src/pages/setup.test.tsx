import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Setup } from './setup';

describe('Setup', () => {
    it('renders the setup heading', () => {
        const setGamePlayers = vi.fn();
        render(<Setup setGamePlayers={setGamePlayers} />);

        expect(screen.getByText('Add Players')).toBeInTheDocument();
    });

    it('renders add player input', () => {
        const setGamePlayers = vi.fn();
        render(<Setup setGamePlayers={setGamePlayers} />);

        expect(screen.getByPlaceholderText('Player')).toBeInTheDocument();
    });

    it('has disabled start button when less than 2 players', () => {
        const setGamePlayers = vi.fn();
        render(<Setup setGamePlayers={setGamePlayers} />);

        const startButton = screen.getByRole('button', { name: /start game/i });
        expect(startButton).toBeDisabled();
    });

    it('enables start button when 2 or more players are added', async () => {
        const setGamePlayers = vi.fn();
        const user = userEvent.setup();

        render(<Setup setGamePlayers={setGamePlayers} />);

        const input = screen.getByPlaceholderText('Player');
        const addButton = screen.getByRole('button', { name: /add/i });

        await user.type(input, 'Alice');
        await user.click(addButton);

        await user.type(input, 'Bob');
        await user.click(addButton);

        const startButton = screen.getByRole('button', { name: /start game/i });
        expect(startButton).not.toBeDisabled();
    });

    it('displays added players', async () => {
        const setGamePlayers = vi.fn();
        const user = userEvent.setup();

        render(<Setup setGamePlayers={setGamePlayers} />);

        const input = screen.getByPlaceholderText('Player');
        const addButton = screen.getByRole('button', { name: /add/i });

        await user.type(input, 'Alice');
        await user.click(addButton);

        expect(screen.getByDisplayValue('Alice')).toBeInTheDocument();
    });

    it('calls setGamePlayers when start game is clicked', async () => {
        const setGamePlayers = vi.fn();
        const user = userEvent.setup();

        render(<Setup setGamePlayers={setGamePlayers} />);

        const input = screen.getByPlaceholderText('Player');
        const addButton = screen.getByRole('button', { name: /add/i });

        await user.type(input, 'Alice');
        await user.click(addButton);

        await user.type(input, 'Bob');
        await user.click(addButton);

        const startButton = screen.getByRole('button', { name: /start game/i });
        await user.click(startButton);

        expect(setGamePlayers).toHaveBeenCalledWith(['Alice', 'Bob']);
    });

    it('removes player when remove is clicked', async () => {
        const setGamePlayers = vi.fn();
        const user = userEvent.setup();

        render(<Setup setGamePlayers={setGamePlayers} />);

        const input = screen.getByPlaceholderText('Player');
        const addButton = screen.getByRole('button', { name: /add/i });

        await user.type(input, 'Alice');
        await user.click(addButton);

        expect(screen.getByDisplayValue('Alice')).toBeInTheDocument();

        const removeButton = screen.getByRole('button', { name: /remove/i });
        await user.click(removeButton);

        expect(screen.queryByDisplayValue('Alice')).not.toBeInTheDocument();
    });
});
