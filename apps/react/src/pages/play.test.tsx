import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Play } from './play';
import { Scores } from '@fsc/types';

describe('Play', () => {
    const mockPlayers = ['Alice', 'Bob'];
    const mockScorecards: Scores = {
        Alice: { turns: [], total: 0, onBoard: false },
        Bob: { turns: [], total: 0, onBoard: false },
    };
    const defaultProps = {
        players: mockPlayers,
        scorecards: mockScorecards,
        setScorecards: vi.fn(),
        onFinalRoundCheck: vi.fn(),
        gameOver: false,
        canUndo: false,
        onUndo: vi.fn(),
    };

    it('renders the scorecard heading', () => {
        render(<Play {...defaultProps} />);

        expect(screen.getByText('Scorecard')).toBeInTheDocument();
    });

    it('renders all player scorecards', () => {
        render(<Play {...defaultProps} />);

        expect(screen.getAllByText('Alice').length).toBeGreaterThan(0);
        expect(screen.getAllByText('Bob').length).toBeGreaterThan(0);
    });

    it('renders the current player edit form', () => {
        render(<Play {...defaultProps} />);

        expect(screen.getByPlaceholderText('Score')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
    });

    it('calls setScorecards with player and score when save is clicked', async () => {
        const setScorecards = vi.fn();
        const user = userEvent.setup();

        render(<Play {...defaultProps} setScorecards={setScorecards} />);

        const input = screen.getByPlaceholderText('Score');
        const saveButton = screen.getByRole('button', { name: /save/i });

        await user.clear(input);
        await user.type(input, '500');
        await user.click(saveButton);

        expect(setScorecards).toHaveBeenCalledWith('Alice', 500);
    });

    it('cycles to next player after saving score', async () => {
        const setScorecards = vi.fn();
        const user = userEvent.setup();

        render(<Play {...defaultProps} setScorecards={setScorecards} />);

        // First player is Alice
        const headings = screen.getAllByRole('heading', { level: 3 });
        expect(headings[0]).toHaveTextContent('Alice');

        const input = screen.getByPlaceholderText('Score');
        const saveButton = screen.getByRole('button', { name: /save/i });

        await user.clear(input);
        await user.type(input, '500');
        await user.click(saveButton);

        // After save, should move to Bob
        const newHeadings = screen.getAllByRole('heading', { level: 3 });
        expect(newHeadings[0]).toHaveTextContent('Bob');
    });

    it('displays player totals', () => {
        const scorecards: Scores = {
            Alice: { turns: [500, 300], total: 800, onBoard: true },
            Bob: { turns: [600], total: 600, onBoard: true },
        };

        render(<Play {...defaultProps} scorecards={scorecards} />);

        expect(screen.getByText('Total: 800')).toBeInTheDocument();
        expect(screen.getByText('Total: 600')).toBeInTheDocument();
    });
});
