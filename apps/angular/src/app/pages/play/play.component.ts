import { Component } from '@angular/core';
import { Scorecard } from '@fsc/types';
import { Store } from '@ngrx/store';
@Component({
    selector: 'fsc-play',
    templateUrl: './play.component.html',
    styleUrls: ['./play.component.scss'],
})
export class PlayComponent {
    players: string[] = [];
    scores: {
        [key: string]: Scorecard;
    };
    error = false;

    constructor(private store: Store<{ players: { players: string[] } }>) {
        this.store.subscribe((state) => {
            this.players = state.players.players;
        });
    }
}
