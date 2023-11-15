import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Experience, ResumeTree } from '../resume/resume.model';
import typia from 'typia';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  providers: [HttpClient]
})
export class DetailsComponent {
  @Input({ required: true }) rTree!: ResumeTree;
  @Output() close = new EventEmitter<void>();

  public description: string = "";

  constructor(private readonly http: HttpClient) { };

  ngOnInit(): void {
    const rTreeDescription = this.rTreeAsExperience()?.description || "";

    if (rTreeDescription.endsWith(".md")) {
      this.http.get('./assets/' + rTreeDescription, {
        responseType: "text"
      })
        .subscribe((str: string) => this.description = str);
    } else {
      this.description = rTreeDescription;
    }
  }

  isExperience = () => typia.is<Experience>(this.rTree);
  rTreeAsExperience = (): Experience | undefined => this.isExperience() ? typia.assert<Experience>(this.rTree) : undefined;
  title = () => this.rTreeAsExperience()?.title || this.rTree.label;
  altTitle = () => this.rTreeAsExperience()?.title ? (this.rTree?.label || '') : '';
}
