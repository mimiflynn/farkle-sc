import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { EditPlayerScoreComponent } from './edit-player-score.component';

describe('EditPlayerScoreComponent', () => {
    let component: EditPlayerScoreComponent;
    let fixture: ComponentFixture<EditPlayerScoreComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [EditPlayerScoreComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(EditPlayerScoreComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
