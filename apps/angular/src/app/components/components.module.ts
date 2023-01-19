import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NavComponent } from './nav/nav.component';
import { ScoreComponent } from './score/score.component';
import { PlayerComponent } from './player/player.component';

const components = [
    NavComponent,
    ScoreComponent,
    PlayerComponent
]

@NgModule({
    declarations: components,
    imports: [
        BrowserModule
    ],
    exports: components
})
export class ComponentsModule { }
