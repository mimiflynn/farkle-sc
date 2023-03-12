import { Component } from '@angular/core';
import { type Store } from '@ngrx/store';

import { addPlayer } from 'app/store/players/players.actions';

@Component({
  selector: 'fsc-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
})
export class SetupComponent {
  players: string[] = [];

    constructor(private readonly store: Store<{ players: string[] }>) {
    this.store.subscribe((state) => {
      console.log('state', state);
            this.players = state.players;
        });
  }

  addPlayer(name: string) {
    console.log('add player in setup', name);
        addPlayer({ name });
    }
}
