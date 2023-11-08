import { Component } from '@angular/core';
import { Node, ClusterNode, Edge } from '@swimlane/ngx-graph';
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

  mdPath: string = './assets/visier-description.md';
  isMouseOver = false;

  mouseover(): void {
    this.isMouseOver = true;
    window.alert('moused');
    console.log('moused');
  }
}
