import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NavComponent } from './nav/nav.component';

const components = [
    NavComponent,
]

@NgModule({
    declarations: components,
    imports: [
        BrowserModule
    ],
    exports: components
})
export class ComponentsModule { }
