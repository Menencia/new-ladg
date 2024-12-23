import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodeComponent } from './episode.component';

describe('StoryComponent', () => {
  let component: EpisodeComponent;
  let fixture: ComponentFixture<EpisodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EpisodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EpisodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
