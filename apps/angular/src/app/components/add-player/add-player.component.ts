import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'fsc-add-player',
    standalone: false,
    templateUrl: './add-player.component.html',
    styleUrls: ['./add-player.component.scss'],
})
export class AddPlayerComponent {
    @Output()
    addPlayer = new EventEmitter<string>();

    name = '';

    save(): void {
        this.addPlayer.emit(this.name);
        this.name = '';
    }
}
