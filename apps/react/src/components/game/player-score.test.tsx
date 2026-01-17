import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PlayerScore } from './player-score';

describe('PlayerScore', () => {
    const emptyScorecard = {
        turns: [],
        total: 0,
        onBoard: false,
    };

    it('renders player name', () => {
        render(<PlayerScore player="Alice" scorecard={emptyScorecard} />);

        expect(screen.getByText('Alice')).toBeInTheDocument();
    });

    it('displays total score', () => {
        const scorecard = {
            turns: [500, 300],
            total: 800,
            onBoard: true,
        };

        render(<PlayerScore player="Alice" scorecard={scorecard} />);

        expect(screen.getByText('Total: 800')).toBeInTheDocument();
    });

    it('shows warning message when not on board', () => {
        render(<PlayerScore player="Alice" scorecard={emptyScorecard} />);

        expect(
            screen.getByText(/A score of 500 is needed in one roll to be on the board/i)
        ).toBeInTheDocument();
    });

    it('does not show warning when player has scored', () => {
        const scorecard = {
            turns: [500],
            total: 500,
            onBoard: true,
        };

        render(<PlayerScore player="Alice" scorecard={scorecard} />);

        expect(
            screen.queryByText(/A score of 500 is needed in one roll to be on the board/i)
        ).not.toBeInTheDocument();
    });

    it('displays turn history when there are turns', () => {
        const scorecard = {
            turns: [500, 300, 200],
            total: 1000,
            onBoard: true,
        };

        render(<PlayerScore player="Alice" scorecard={scorecard} />);

        expect(screen.getByText('Turn History')).toBeInTheDocument();
        expect(screen.getByText('500')).toBeInTheDocument();
        expect(screen.getByText('300')).toBeInTheDocument();
        expect(screen.getByText('200')).toBeInTheDocument();
    });

    it('does not display turn history when there are no turns', () => {
        render(<PlayerScore player="Alice" scorecard={emptyScorecard} />);

        expect(screen.queryByText('Turn History')).not.toBeInTheDocument();
    });

    it('applies on-board class when player is on board', () => {
        const scorecard = {
            turns: [500],
            total: 500,
            onBoard: true,
        };

        const { container } = render(<PlayerScore player="Alice" scorecard={scorecard} />);

        expect(container.firstChild).toHaveClass('on-board');
    });

    it('does not apply on-board class when player is not on board', () => {
        const { container } = render(
            <PlayerScore player="Alice" scorecard={emptyScorecard} />
        );

        expect(container.firstChild).not.toHaveClass('on-board');
    });
});
