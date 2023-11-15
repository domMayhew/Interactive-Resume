import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceSubtitleComponent } from './experience-subtitle.component';

describe('SubtitleComponent', () => {
  let component: ExperienceSubtitleComponent;
  let fixture: ComponentFixture<ExperienceSubtitleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExperienceSubtitleComponent]
    });
    fixture = TestBed.createComponent(ExperienceSubtitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
