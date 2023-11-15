import { Component, Input } from '@angular/core';
import { ConfigService } from '../config-service';
import { Bio } from '../resume/resume.model';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.scss'],
  providers: [ConfigService]
})
export class BioComponent {
  @Input({ required: true }) bio!: Bio;
  constructor(readonly config: ConfigService) { }
}
