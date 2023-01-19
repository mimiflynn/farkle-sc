import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayPageComponent } from './pages/play/play.component';
import { SetupPageComponent } from './pages/setup/setup.component';


const routes: Routes = [
  { path: '', component: SetupPageComponent },
  { path: 'play', component: PlayPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
