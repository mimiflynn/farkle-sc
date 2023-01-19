import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PlayPageComponent } from './play/play.component';
import { SetupPageComponent } from './setup/setup.component';

const pages = [
    PlayPageComponent,
    SetupPageComponent
];

@NgModule({
    declarations: pages,
    imports: [
        BrowserModule
    ],
    exports: pages
})
export class PagesModule { }
