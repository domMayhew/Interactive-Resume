import { Component, Input } from '@angular/core';
import { Project } from 'src/app/models/resume.model';

@Component({
  selector: 'app-project-subtitle',
  templateUrl: './project-subtitle.component.html',
  styleUrls: ['./project-subtitle.component.scss']
})
export class ProjectSubtitleComponent {
  @Input({ required: true }) project!: Project;
}
