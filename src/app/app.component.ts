import { Component } from '@angular/core';
import { Node, ClusterNode, Edge, Graph } from '@swimlane/ngx-graph';
import { CvDataService } from './cvGraph/cv-data.service';
import { Resume, ResumeTree } from './cvGraph/cvData.model';
import { assert, is } from 'typia';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [CvDataService]
})
export class AppComponent {

  constructor(private readonly cvDataService: CvDataService) {
    this.panToNodeObs$.subscribe((node: Node) => console.log(node));
  };

  readonly title = 'icv';

  layoutSettings = { multigraph: false };
  layout = "dagreCluster";
  private readonly resume: Resume = this.cvDataService.getInitResume();
  graph: Graph = this.cvDataService.buildGraph(this.resume);

  mdPath: string = './assets/visier-description.md';
  isMouseOver = false;

  panToNodeSub$: Subject<Node> = new Subject();
  panToNodeObs$: Observable<Node> = this.panToNodeSub$.asObservable();

  doubleClick(node: Node): void {
    const rTree = assert<ResumeTree>(node.data);
    this.cvDataService.toggleExpanded(rTree);
    this.graph = this.cvDataService.buildGraph(this.resume);
    this.panToNodeSub$.next(node);
  }
}
