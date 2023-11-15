import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSubtitleComponent } from './project-subtitle.component';

describe('ProjectSubtitleComponent', () => {
  let component: ProjectSubtitleComponent;
  let fixture: ComponentFixture<ProjectSubtitleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectSubtitleComponent]
    });
    fixture = TestBed.createComponent(ProjectSubtitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
