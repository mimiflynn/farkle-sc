import React from 'react';

export function Nav({ children }) {
    return (
        <nav className="position-sticky navbar navbar-expand-lg navbar-dark bg-dark">
            <span className="navbar-brand">Farkle Scorecard</span>
            {children}
        </nav >
    );
}