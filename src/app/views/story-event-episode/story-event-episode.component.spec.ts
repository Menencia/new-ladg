import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryEventEpisodeComponent } from './story-event-episode.component';

describe('StoryComponent', () => {
  let component: StoryEventEpisodeComponent;
  let fixture: ComponentFixture<StoryEventEpisodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoryEventEpisodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoryEventEpisodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
