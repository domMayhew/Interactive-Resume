import { Component } from '@angular/core';
import { Node, Edge } from '@swimlane/ngx-graph';
// import { experienceNodes, edges } from 'src/assets/graph';
import { CvDataService } from './cv-data.service';
import { CVData } from 'src/assets/GraphInterface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // providers: [CvDataService]
})
export class AppComponent {

  constructor(private readonly cvDataService: CvDataService) { };

  readonly title = 'icv';

  nodes: Node[] = this.cvDataService.leafNodes();
  edges: Edge[] = this.cvDataService.edges();
}
