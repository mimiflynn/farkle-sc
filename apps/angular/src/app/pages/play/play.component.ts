import { Component } from '@angular/core';
import { Scores } from '@fsc/types';
import { Store } from '@ngrx/store';

import { State } from '../../store/index';
@Component({
    selector: 'fsc-play',
    templateUrl: './play.component.html',
    styleUrls: ['./play.component.scss'],
})
export class PlayComponent {
    players: string[] = [];
    scores: Scores;
    currentPlayer = 0;
    error = false;

    constructor(private store: Store<State>) {
        this.store.subscribe(({ players, game }) => {
            this.players = players.players;
            this.scores = game.scores;
        });
    }
}
