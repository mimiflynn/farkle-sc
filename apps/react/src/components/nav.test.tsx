import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Nav } from './nav';

describe('Nav', () => {
    it('renders the brand name', () => {
        render(<Nav>content</Nav>);

        expect(screen.getByText('Farkle Scorecard')).toBeInTheDocument();
    });

    it('renders children', () => {
        render(
            <Nav>
                <button>Test Button</button>
            </Nav>
        );

        expect(screen.getByRole('button', { name: /test button/i })).toBeInTheDocument();
    });

    it('renders navigation element', () => {
        render(<Nav>content</Nav>);

        expect(screen.getByRole('navigation')).toBeInTheDocument();
    });
});
