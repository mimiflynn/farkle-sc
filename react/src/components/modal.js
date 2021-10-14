import React from 'react';

export function Modal(props) {
    return (
        <div classNameName="modal" tabindex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{props.title}</h5>
                    </div>
                    <div className="modal-body">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    );
}