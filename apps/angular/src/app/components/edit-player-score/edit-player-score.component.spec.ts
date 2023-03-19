import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPlayerScoreComponent } from './edit-player-score.component';

describe('EditPlayerScoreComponent', () => {
  let component: EditPlayerScoreComponent;
  let fixture: ComponentFixture<EditPlayerScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPlayerScoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPlayerScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
