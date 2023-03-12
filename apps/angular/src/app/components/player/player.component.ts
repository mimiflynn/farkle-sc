import { Component, EventEmitter, Input, Output } from '@angular/core';
import { type Player } from '@fsc/types';

@Component({
  selector: 'fsc-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent {
  @Input() player: Player = '';

  @Output()
  addPlayer = new EventEmitter<string>();

  edit = false;

  toggleEdit (): void {
    this.edit = !this.edit;
  }
}
