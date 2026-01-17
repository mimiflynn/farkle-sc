import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Modal } from './modal';

describe('Modal', () => {
    it('renders the title', () => {
        render(<Modal title="Test Title">content</Modal>);

        expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('renders children in modal body', () => {
        render(
            <Modal title="Test">
                <p>Modal content here</p>
            </Modal>
        );

        expect(screen.getByText('Modal content here')).toBeInTheDocument();
    });

    it('renders modal structure', () => {
        const { container } = render(<Modal title="Test">content</Modal>);

        expect(container.querySelector('.modal')).toBeInTheDocument();
        expect(container.querySelector('.modal-dialog')).toBeInTheDocument();
        expect(container.querySelector('.modal-content')).toBeInTheDocument();
        expect(container.querySelector('.modal-header')).toBeInTheDocument();
        expect(container.querySelector('.modal-body')).toBeInTheDocument();
    });
});
