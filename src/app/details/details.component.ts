import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Experience, Project, ResumeTree } from '../resume/resume.model';
import typia from 'typia';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  @Input({ required: true }) rTree!: ResumeTree;
  @Output() close = new EventEmitter<void>();

  public description: string = "";

  ngOnInit(): void {
    this.description = this.rTree.description || "";
  }

  isExperience = () => typia.is<Experience>(this.rTree);
  rTreeAsExperience = (): Experience | undefined => this.isExperience() ? typia.assert<Experience>(this.rTree) : undefined;
  title = () => this.rTreeAsExperience()?.title || this.rTree.label;
  altTitle = () => this.rTreeAsExperience()?.title ? (this.rTree?.label || '') : '';

  isProject = () => typia.is<Project>(this.rTree);
  rTreeAsProject = (): Project | undefined => this.isProject() ? typia.assert<Project>(this.rTree) : undefined;
}
