import { type ReactNode } from 'react';

export function Nav({ children }: { children: ReactNode }) {
    return (
        <nav className="position-sticky navbar navbar-expand navbar-dark bg-dark">
            <div className="container-fluid">
                <span className="navbar-brand">Farkle Scorecard</span>
                {children}
            </div>
        </nav>
    );
}
