import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Experience, ResumeTree } from '../resume/resume.model';
import typia from 'typia';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  @Input({ required: true }) rTree!: ResumeTree;
  @Output() close = new EventEmitter<void>();

  isExperience = () => typia.is<Experience>(this.rTree);
  rTreeAsExperience = (): Experience | undefined => this.isExperience() ? typia.assertEquals<Experience>(this.rTree) : undefined;
  title = () => this.rTreeAsExperience()?.title || this.rTree.label;
  altTitle = () => this.rTreeAsExperience()?.label || '';
  description = () => this.rTree.description;
}
