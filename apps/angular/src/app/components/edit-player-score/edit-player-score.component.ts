import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Player, Scorecard } from '@fsc/types';

@Component({
    selector: 'fsc-edit-player-score',
    templateUrl: './edit-player-score.component.html',
    styleUrls: ['./edit-player-score.component.scss'],
})
export class EditPlayerScoreComponent {
    @Input() player: Player = '';
    @Input() scorecard: Scorecard;

    @Output()
    saveScorecard = new EventEmitter<Scorecard>();

    score = 0;

    save() {
        this.saveScorecard.emit(this.scorecard);
    }
}
