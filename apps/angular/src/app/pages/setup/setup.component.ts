import { Component } from '@angular/core';
import { Players } from '@fsc/types';
import { Store } from '@ngrx/store';

import { addPlayer, editPlayer, removePlayer } from 'app/store/players/players.actions';

@Component({
    selector: 'fsc-setup',
    templateUrl: './setup.component.html',
    styleUrls: ['./setup.component.scss'],
})
export class SetupComponent {
    players: Players = [];

    constructor(private store: Store<{ players: { players: string[] } }>) {
        this.store.subscribe((state) => {
            this.players = state.players.players;
        });
    }

    handleAddPlayer(newPlayer: string): void {
        this.store.dispatch(addPlayer({ newPlayer }));
    }

    handleEditPlayer({ oldPlayer, newPlayer }: { oldPlayer: string; newPlayer: string }): void {
        this.store.dispatch(editPlayer({ oldPlayer, newPlayer }));
    }

    handleRemovePlayer(player: string): void {
        this.store.dispatch(removePlayer({ player }));
    }
}
