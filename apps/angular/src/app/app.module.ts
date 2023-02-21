import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReferenceComponent } from './components/reference/reference.component';
import { PlayComponent } from './pages/play/play.component';
import { SetupComponent } from './pages/setup/setup.component';

@NgModule({
  declarations: [
    AppComponent,
    ReferenceComponent,
    PlayComponent,
    SetupComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
