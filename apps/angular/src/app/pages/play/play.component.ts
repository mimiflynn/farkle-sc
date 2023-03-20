import { Component } from '@angular/core';
import { Scores } from '@fsc/types';
import { Store } from '@ngrx/store';
import { setScore } from 'app/store/game/game.actions';
import { nextPlayer } from 'app/store/players/players.actions';

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

    handleSetScore(score: number) {
        this.store.dispatch(setScore({ player: this.players[this.currentPlayer], score }));
        this.store.dispatch(nextPlayer());
    }
}
