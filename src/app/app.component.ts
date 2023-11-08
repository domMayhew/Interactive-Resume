import { Component } from '@angular/core';
import { Node, ClusterNode, Edge } from '../../../../../lib/ngx-graph/projects/swimlane/ngx-graph/src/lib/models';
// import { experienceNodes, edges } from 'src/assets/graph';
import { CvDataService } from './cv-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(private readonly cvDataService: CvDataService) { };

  readonly title = 'icv';

  nodes: Node[] = this.cvDataService.leafNodes();
  clusters: ClusterNode[] = this.cvDataService.clusterNodes();
  edges: Edge[] = this.cvDataService.edges();
  click(node: Node): void { };
}
