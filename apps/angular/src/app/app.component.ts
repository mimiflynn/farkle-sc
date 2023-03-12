import { Component } from '@angular/core';
import { type Scores } from '@fsc/types';

@Component({
  selector: 'fsc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  players: string[] = [];
    scores: Scores = {};

    showReference = false;
    showNewGameWarning = false;

    ngOnInit() {}

  resetGame() {
    this.showNewGameWarning = false;
        this.players = [];
        this.scores = {};
    }
}
