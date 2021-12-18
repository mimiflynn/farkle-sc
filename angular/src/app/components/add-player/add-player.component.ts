import { Component, OnInit } from '@angular/core';
import { Player } from '../../../../../lib';

@Component({
    selector: 'sc-player',
    templateUrl: './player.component.html'
})
export class PlayerComponent implements OnInit {
    player: Player;

    constructor() { }

    ngOnInit(): void {
    }

}
