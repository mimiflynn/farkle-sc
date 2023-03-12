import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'fsc-add-player',
    templateUrl: './add-player.component.html',
    styleUrls: ['./add-player.component.scss'],
})
export class AddPlayerComponent {
    @Output()
    addPlayer = new EventEmitter<string>();

    name = '';

    save(): void {
        console.log('save name', this.name);
        this.addPlayer.emit(this.name);
    }
}
