import { Component, Input } from '@angular/core';
import { Player } from '@fsc/types';

@Component({
  selector: 'fsc-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
})
export class SetupComponent {
  @Input() players: Player[] = [];
}
