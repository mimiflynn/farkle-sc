import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DEFAULT_ON_BOARD_THRESHOLD } from '@fsc/types';
import { Store } from '@ngrx/store';
import { initScores, setOnBoardThreshold } from 'app/store/game/game.actions';

import { addPlayer, editPlayer, removePlayer } from 'app/store/players/players.actions';

@Component({
    selector: 'fsc-setup',
    standalone: false,
    templateUrl: './setup.component.html',
    styleUrls: ['./setup.component.scss'],
})
export class SetupComponent {
    players: string[] = [];
    onBoardThreshold = DEFAULT_ON_BOARD_THRESHOLD;

    constructor(
        private store: Store<{ players: { players: string[] } }>,
        private router: Router
    ) {
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

    handleThresholdChange(value: string): void {
        this.onBoardThreshold = Number(value);
        this.store.dispatch(setOnBoardThreshold({ threshold: this.onBoardThreshold }));
    }

    play(): void {
        this.store.dispatch(initScores({ players: this.players }));
        this.router.navigateByUrl('play');
    }
}
