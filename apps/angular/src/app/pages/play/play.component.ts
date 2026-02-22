import { Component } from '@angular/core';
import { Scorecard, Scores, WIN_SCORE } from '@fsc/types';
import { getLeader } from '@fsc/state';
import { Store } from '@ngrx/store';
import { setScore, undoScore, setFinalRound, setGameOver } from 'app/store/game/game.actions';
import { State, getWinner } from 'app/store/index';
import { nextPlayer } from 'app/store/players/players.actions';

@Component({
    selector: 'fsc-play',
    standalone: false,
    templateUrl: './play.component.html',
    styleUrls: ['./play.component.scss'],
})
export class PlayComponent {
    players: string[] = [];
    scores: Scores;
    currentPlayer = 0;
    error = false;
    finalRound = false;
    finalRoundStartPlayer: string | null = null;
    gameOver = false;
    winnerName: string | null = null;
    lastActionPlayer: string | null = null;
    winScore = WIN_SCORE;
    leader: string | null = null;

    constructor(private store: Store<State>) {
        this.store.subscribe(({ players, game }) => {
            this.currentPlayer = players.currentPlayer;
            this.players = players.players;
            this.scores = game.scores;
            this.finalRound = game.finalRound;
            this.finalRoundStartPlayer = game.finalRoundStartPlayer;
            this.gameOver = game.gameOver;
            this.winnerName = game.winnerName;
            this.lastActionPlayer = game.lastActionPlayer;
            this.leader = getLeader(this.scores);
        });
    }

    handleSetScore(score: number) {
        const player = this.players[this.currentPlayer];
        this.store.dispatch(setScore({ player, score }));
        this.store.dispatch(nextPlayer());

        // Check for win / final round
        // We need to re-read scores after dispatch
        setTimeout(() => {
            const winner = getWinner(this.scores);
            if (winner && !this.finalRound) {
                this.store.dispatch(
                    setFinalRound({ finalRoundStartPlayer: player, winnerName: winner })
                );
            }

            // Check if final round has come back to the trigger player
            if (
                this.finalRound &&
                this.players[this.currentPlayer] === this.finalRoundStartPlayer
            ) {
                let highestScore = 0;
                let actualWinner = '';
                for (const p of this.players) {
                    if (this.scores[p].total > highestScore) {
                        highestScore = this.scores[p].total;
                        actualWinner = p;
                    }
                }
                this.store.dispatch(setGameOver({ winnerName: actualWinner }));
            }
        });
    }

    handleUndo() {
        if (this.lastActionPlayer) {
            this.store.dispatch(undoScore({ player: this.lastActionPlayer }));
        }
    }

    getScorecard(player: string): Scorecard {
        return this.scores[player];
    }
}
