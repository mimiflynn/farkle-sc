import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { EditPlayerScore } from './edit-player-score';

describe('EditPlayerScore', () => {
    const mockScorecard = {
        turns: [],
        total: 0,
        onBoard: false,
    };

    it('renders player name', () => {
        const handleSave = vi.fn();
        render(
            <EditPlayerScore
                handleSave={handleSave}
                player="Alice"
                scorecard={mockScorecard}
            />
        );

        expect(screen.getByText('Alice')).toBeInTheDocument();
    });

    it('calls handleSave with a number, not a string', async () => {
        const handleSave = vi.fn();
        const user = userEvent.setup();

        render(
            <EditPlayerScore
                handleSave={handleSave}
                player="Alice"
                scorecard={mockScorecard}
            />
        );

        const input = screen.getByPlaceholderText('Score');
        const saveButton = screen.getByRole('button', { name: /save/i });

        await user.clear(input);
        await user.type(input, '500');
        await user.click(saveButton);

        expect(handleSave).toHaveBeenCalledWith(500);
        expect(handleSave).not.toHaveBeenCalledWith('500');
        expect(typeof handleSave.mock.calls[0][0]).toBe('number');
    });

    it('resets input value to 0 after saving', async () => {
        const handleSave = vi.fn();
        const user = userEvent.setup();

        render(
            <EditPlayerScore
                handleSave={handleSave}
                player="Alice"
                scorecard={mockScorecard}
            />
        );

        const input = screen.getByPlaceholderText('Score') as HTMLInputElement;
        const saveButton = screen.getByRole('button', { name: /save/i });

        await user.clear(input);
        await user.type(input, '350');
        await user.click(saveButton);

        expect(input.value).toBe('0');
    });

    it('applies on-board class when player is on board', () => {
        const handleSave = vi.fn();
        const onBoardScorecard = { ...mockScorecard, onBoard: true };

        const { container } = render(
            <EditPlayerScore
                handleSave={handleSave}
                player="Alice"
                scorecard={onBoardScorecard}
            />
        );

        expect(container.firstChild).toHaveClass('on-board');
    });

    it('applies off-board class when player is not on board', () => {
        const handleSave = vi.fn();

        const { container } = render(
            <EditPlayerScore
                handleSave={handleSave}
                player="Alice"
                scorecard={mockScorecard}
            />
        );

        expect(container.firstChild).toHaveClass('off-board');
    });
});
