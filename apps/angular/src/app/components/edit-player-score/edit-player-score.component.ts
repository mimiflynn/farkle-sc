import {
    Component,
    EventEmitter,
    Input,
    Output,
    ViewChild,
    ElementRef,
    OnChanges,
} from '@angular/core';
import { Player } from '@fsc/types';

@Component({
    selector: 'fsc-edit-player-score',
    standalone: false,
    templateUrl: './edit-player-score.component.html',
    styleUrls: ['./edit-player-score.component.scss'],
})
export class EditPlayerScoreComponent implements OnChanges {
    @Input() player: Player = '';
    @ViewChild('scoreInput') scoreInput: ElementRef<HTMLInputElement>;

    @Output()
    saveScorecard = new EventEmitter<number>();

    score = 0;

    ngOnChanges() {
        setTimeout(() => {
            if (this.scoreInput?.nativeElement) {
                this.scoreInput.nativeElement.focus();
                this.scoreInput.nativeElement.select();
            }
        });
    }

    onScoreChange(value: number) {
        this.score = value < 0 ? 0 : value;
    }

    save() {
        this.saveScorecard.emit(this.score);
        this.score = 0;
    }

    farkle() {
        this.saveScorecard.emit(0);
        this.score = 0;
    }
}
