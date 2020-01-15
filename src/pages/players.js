import React from 'react';

import { AddPlayer } from '../components/add-player';

export function Players() {
    const handleAddPlayer = () => {
        console.log('handle add player');
    };

    return (
        <div>
            <div className="row players">
                <AddPlayer handleSave={handleAddPlayer} />
            </div>
            <div className="row">
                <div className="col-12">
                    <ul className="list-group">
                        <li className="list-group-item">Cras justo odio</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}