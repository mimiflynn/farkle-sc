import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'fsc-add-player',
    standalone: false,
    templateUrl: './add-player.component.html',
    styleUrls: ['./add-player.component.scss'],
})
export class AddPlayerComponent {
    @Input() existingPlayers: string[] = [];

    @Output()
    addPlayer = new EventEmitter<string>();

    name = '';
    error = '';

    save(): void {
        const trimmed = this.name.trim();
        if (!trimmed) {
            this.error = 'Player name cannot be empty';
            return;
        }
        if (this.existingPlayers.some((p) => p.toLowerCase() === trimmed.toLowerCase())) {
            this.error = 'Player name already exists';
            return;
        }
        this.addPlayer.emit(trimmed);
        this.name = '';
        this.error = '';
    }
}
