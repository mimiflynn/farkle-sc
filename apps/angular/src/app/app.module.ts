import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReferenceComponent } from './components/reference/reference.component';
import { PlayComponent } from './pages/play/play.component';
import { SetupComponent } from './pages/setup/setup.component';
import { NavComponent } from './components/nav/nav.component';
import { RulesComponent } from './components/rules/rules.component';
import { ModalComponent } from './components/modal/modal.component';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { PlayerComponent } from './components/player/player.component';

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
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
