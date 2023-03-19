import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { EditPlayerScoreComponent } from './components/edit-player-score/edit-player-score.component';
import { ModalComponent } from './components/modal/modal.component';
import { NavComponent } from './components/nav/nav.component';
import { PlayerComponent } from './components/player/player.component';
import { PlayerScoreComponent } from './components/player-score/player-score.component';
import { ReferenceComponent } from './components/reference/reference.component';
import { RulesComponent } from './components/rules/rules.component';
import { PlayComponent } from './pages/play/play.component';
import { SetupComponent } from './pages/setup/setup.component';

import { gameReducer } from './store/game/game.reducers';
import { playersReducer } from './store/players/players.reducer';

@NgModule({
    declarations: [
        AppComponent,
        ReferenceComponent,
        PlayComponent,
        SetupComponent,
        NavComponent,
        RulesComponent,
        ModalComponent,
        AddPlayerComponent,
        PlayerComponent,
        PlayerScoreComponent,
        EditPlayerScoreComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        StoreModule.forRoot({ players: playersReducer, game: gameReducer }),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
