import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Player } from '@fsc/types';

import { addPlayer } from 'app/store/players/players.actions';

@Component({
  selector: 'fsc-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
})
export class SetupComponent {
  @Input() players: Player[] = [];

  constructor(private store: Store<{ players: string[] }>) {
    console.log('store', store);
  }

  addPlayer(name: string) {
    addPlayer({ name });
  }
}
