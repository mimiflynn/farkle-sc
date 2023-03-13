import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { addPlayer, editPlayer, removePlayer } from 'app/store/players/players.actions';

@Component({
    selector: 'fsc-setup',
    templateUrl: './setup.component.html',
    styleUrls: ['./setup.component.scss'],
})
export class SetupComponent {
    players: string[] = [];

    constructor(private store: Store<{ players: { players: string[] } }>) {
        this.store.subscribe((state) => {
            this.players = state.players.players;
        });
    }

    handleAddPlayer(name: string): void {
        this.store.dispatch(addPlayer({ name }));
    }

    handleEditPlayer({ oldName, newName }: { oldName: string; newName: string }): void {
        this.store.dispatch(editPlayer({ oldName, newName }));
    }

    handleRemovePlayer(name: string): void {
        this.store.dispatch(removePlayer({ name }));
    }
}
