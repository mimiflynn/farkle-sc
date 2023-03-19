import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { addPlayer, editPlayer, removePlayer } from 'app/store/players/players.actions';

@Component({
    selector: 'fsc-setup',
    templateUrl: './setup.component.html',
    styleUrls: ['./setup.component.scss'],
})
export class SetupComponent {
    players: string[] = [];

    constructor(private store: Store<{ players: { players: string[] } }>, private router: Router) {
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

    play(): void {
        console.log('play clicked');
        this.router.navigateByUrl('play');
    }
}
