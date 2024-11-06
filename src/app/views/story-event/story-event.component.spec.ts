import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryEventComponent } from './story-event.component';

describe('StoryComponent', () => {
  let component: StoryEventComponent;
  let fixture: ComponentFixture<StoryEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoryEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoryEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
