import { Component, EventEmitter, Input, Output } from '@angular/core';
import { type Player } from '@fsc/types';

@Component({
    selector: 'fsc-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss'],
})
export class PlayerComponent {
    @Input() player: Player = '';

    @Output()
    editPlayer = new EventEmitter<{ oldName: string; newName: string }>();

    @Output()
    removePlayer = new EventEmitter<string>();

    oldPlayer = '';
    edit = false;

    toggleEdit(): void {
        this.edit = !this.edit;
        this.oldPlayer = this.player.slice();
    }

    save(): void {
        this.editPlayer.emit({ oldName: this.oldPlayer, newName: this.player });
    }

    remove(): void {
        this.removePlayer.emit(this.player);
    }
}
