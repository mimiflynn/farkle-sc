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
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            logOnly: !isDevMode(), // Restrict extension to log-only mode
            autoPause: true, // Pauses recording actions and state changes when the extension window is not open
            trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
            traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
        }),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
