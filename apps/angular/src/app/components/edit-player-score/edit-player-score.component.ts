import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Player } from '@fsc/types';

@Component({
    selector: 'fsc-edit-player-score',
    templateUrl: './edit-player-score.component.html',
    styleUrls: ['./edit-player-score.component.scss'],
})
export class EditPlayerScoreComponent implements OnChanges {
    @Input() player: Player = '';

    @Output()
    saveScorecard = new EventEmitter<number>();

    score = 0;

    ngOnChanges(): void {
        console.log('player', this.player);
    }

    save() {
        this.saveScorecard.emit(this.score);
        this.score = 0;
    }
}
