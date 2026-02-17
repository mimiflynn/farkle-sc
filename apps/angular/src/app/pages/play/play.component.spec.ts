import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideMockStore } from '@ngrx/store/testing';

import { PlayComponent } from './play.component';

describe('PlayComponent', () => {
    let component: PlayComponent;
    let fixture: ComponentFixture<PlayComponent>;

    const initialState = {
        players: { players: [], currentPlayer: 0 },
        game: {
            scores: {},
            finalRound: false,
            finalRoundStartPlayer: null,
            gameOver: false,
            winnerName: null,
            lastActionPlayer: null,
        },
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PlayComponent],
            providers: [provideMockStore({ initialState })],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();

        fixture = TestBed.createComponent(PlayComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
