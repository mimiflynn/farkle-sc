import { GameState } from './game/game.reducers';
import { PlayersState } from './players/players.reducer';

export interface State {
    players: PlayersState;
    game: GameState;
}
