import { Component, Input } from '@angular/core';
import { Experience } from 'src/app/resume/resume.model';

@Component({
  selector: 'app-experience-subtitle',
  templateUrl: './experience-subtitle.component.html',
  styleUrls: ['./experience-subtitle.component.scss']
})
export class ExperienceSubtitleComponent {
  @Input({ required: true }) experience!: Experience;

  duration = (): string => {
    const [startYear, startMonth] = this.experience.start;
    const [endYear, endMonth] = this.experience.end || [new Date().getFullYear(), new Date().getMonth()];
    const totalMonths = (endYear - startYear) * 12 + endMonth - startMonth + 1; // end date is inclusive
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    return (years > 0 ? `${years} yrs., ` : '') + `${months} mos.`;
  }
}
