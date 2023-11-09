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
    // this.panToNodeObs$.subscribe((node: Node) => console.log(node));
  };

  readonly title = 'icv';

  layoutSettings = { multigraph: false, nodePadding: 20, edgePadding: 50 };
  layout = "dagreCluster";
  private readonly resume: Resume = this.cvDataService.getInitResume();
  graph: Graph = this.cvDataService.buildGraph(this.resume);

  mdPath: string = './assets/visier-description.md';
  isMouseOver = false;

  // panToNodeSub$: Subject<Node> = new Subject();
  // panToNodeObs$: Observable<Node> = this.panToNodeSub$.asObservable();

  doubleClick(node: Node): void {
    const rTree = assert<ResumeTree>(node.data);
    this.cvDataService.toggleExpanded(rTree);
    this.graph = this.cvDataService.buildGraph(this.resume);
    // this.graph.nodes.forEach(n => n.transform = )
  }

  mouseenter(cluster: Node, event: MouseEvent): void {
    const el: Element = event.target as Element;
    if (!el.classList.contains("hovered")) {
      el.classList.add("hovered");
    }
  }

  mouseleave(cluster: Node, event: MouseEvent): void {
    const el: Element = event.target as Element;
    const boundingRect = el.getBoundingClientRect();

    const isValidMouseLeave = event.x < boundingRect.x || event.x > boundingRect.x + boundingRect.width ||
      event.y < boundingRect.y || event.y > boundingRect.y + boundingRect.height;

    if (isValidMouseLeave) {
      el.classList.remove("hovered");
    } else {
    }
  }
}
