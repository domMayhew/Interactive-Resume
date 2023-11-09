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
  };

  readonly title = 'icv';

  layoutSettings = { multigraph: false, nodePadding: 20, edgePadding: 50 };
  layout = "dagreCluster";
  private readonly resume: Resume = this.cvDataService.getInitResume();
  graph: Graph = this.cvDataService.buildGraph(this.resume);

  mdPath: string = './assets/visier-description.md';
  isMouseOver = false;

  updateSub$: Subject<boolean> = new Subject();
  updateObs$: Observable<boolean> = this.updateSub$.asObservable();

  // panToNodeSub$: Subject<Node> = new Subject();
  // panToNodeObs$: Observable<Node> = this.panToNodeSub$.asObservable();


  connectedEdges(node: Node): Edge[] {
    return this.graph.edges.filter(e => e.source == node.id || e.target == node.id);
  }

  mouseoverNode(node: Node): void {
    // Reset edges
    this.graph.edges.forEach(e => e.data = { class: "edge" });
    // Update edges
    this.connectedEdges(node)
      .forEach(e => {
        e.data = { class: "edge connected" }
      });
    // Set nodes
    this.graph.nodes.forEach(n => {
      if (this.connectedEdges(node)
        .find(e => e.source == n.id || e.target == n.id)) {
        n.meta.class = "node-container connected";
      } else {
        n.meta.class = "node-container";
      }
    });

    this.updateSub$.next(true);
  }

  mouseleaveNode(node: Node): void {
    this.graph.edges.forEach(e => e.data = { class: "edge" });
    this.graph.nodes.forEach(n => n.meta.class = "node-container");
    this.updateSub$.next(true);
  }

  doubleClick(node: Node): void {
    const rTree = assert<ResumeTree>(node.data);
    this.cvDataService.toggleExpanded(rTree);
    this.graph = this.cvDataService.buildGraph(this.resume);
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
