import { Component, Input } from '@angular/core';
import { Player } from '@fsc/types';

@Component({
  selector: 'fsc-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent {
  @Input() player: Player = '';

  edit: boolean = false;

  toggleEdit(): void {
    this.edit = !this.edit;
  }
}
