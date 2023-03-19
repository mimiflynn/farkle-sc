import { Component, Input } from '@angular/core';
import { Player, Scorecard } from '@fsc/types';

@Component({
    selector: 'fsc-player-score',
    templateUrl: './player-score.component.html',
    styleUrls: ['./player-score.component.scss'],
})
export class PlayerScoreComponent {
    @Input() player: Player = '';
    @Input() scorecard: Scorecard;
}
