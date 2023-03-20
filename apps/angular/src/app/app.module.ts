import { NgModule, isDevMode } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

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
        AddPlayerComponent,
        AppComponent,
        EditPlayerScoreComponent,
        ModalComponent,
        NavComponent,
        PlayComponent,
        PlayerComponent,
        PlayerScoreComponent,
        ReferenceComponent,
        RulesComponent,
        SetupComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        StoreModule.forRoot({ players: playersReducer, game: gameReducer }),
        // https://ngrx.io/guide/store-devtools
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: !isDevMode(),
            autoPause: true,
            trace: false,
            traceLimit: 75,
        }),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
