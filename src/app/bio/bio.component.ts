import { Component, Input } from '@angular/core';
import { ConfigService } from '../services/config/config-service';
import { Info } from '../services/resume/resume.model';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.scss'],
  providers: [ConfigService]
})
export class BioComponent {
  @Input({ required: true }) bio!: Info;
  constructor(readonly config: ConfigService) { }
}
