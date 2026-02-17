import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { AddPlayerComponent } from './add-player.component';

describe('AddPlayerComponent', () => {
    let component: AddPlayerComponent;
    let fixture: ComponentFixture<AddPlayerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [AddPlayerComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(AddPlayerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
