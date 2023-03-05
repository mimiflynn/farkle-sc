import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlayComponent } from './pages/play/play.component';
import { SetupComponent } from './pages/setup/setup.component';

const routes: Routes = [
  { path: 'play', component: PlayComponent },
  { path: 'setup', component: SetupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
