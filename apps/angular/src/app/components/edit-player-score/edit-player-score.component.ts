import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Player } from '@fsc/types';

@Component({
    selector: 'fsc-edit-player-score',
    standalone: false,
    templateUrl: './edit-player-score.component.html',
    styleUrls: ['./edit-player-score.component.scss'],
})
export class EditPlayerScoreComponent {
    @Input() player: Player = '';

    @Output()
    saveScorecard = new EventEmitter<number>();

    score = 0;

    save() {
        this.saveScorecard.emit(this.score);
        this.score = 0;
    }
}
