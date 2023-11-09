import { Component } from '@angular/core';
import { Node, ClusterNode, Edge, Graph } from '@swimlane/ngx-graph';
import { CvDataService } from './cvGraph/cv-data.service';
import { Resume, ResumeTree } from './cvGraph/cvData.model';
import { assert } from 'typia';
import { Observable, Subject, config } from 'rxjs';
import { ConfigService } from './config-service';
import { VectorDate } from './datePipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [CvDataService],
})
export class AppComponent {

  constructor(private readonly cvDataService: CvDataService, private readonly config: ConfigService) { };

  readonly title = 'icv';

  public readonly layoutSettings = this.config.layoutSettings;
  public readonly layout = this.config.layout;

  private resume: Resume = this.cvDataService.buildResume(this.config.jsonResume);
  graph: Graph = this.cvDataService.buildGraph(this.resume);

  updateSub$: Subject<boolean> = new Subject();
  updateObs$: Observable<boolean> = this.updateSub$.asObservable();

  // panToNodeSub$: Subject<Node> = new Subject();
  // panToNodeObs$: Observable<Node> = this.panToNodeSub$.asObservable();

  connectedEdges(node: Node): Edge[] {
    return this.graph.edges.filter(e => e.source == node.id || e.target == node.id);
  }

  setConnections(node: Node, path: string[], isConnected: boolean): void {
    const neighbours = this.graph.edges.flatMap(e => {
      if (e.source === node.id) {
        e.data.connected = isConnected;
        return [e.target];
      } else if (e.target === node.id) {
        e.data.connected = isConnected;
        return [e.source];
      } else {
        e.data.isConnected = false;
        return [];
      }
    });

    this.graph.nodes.map(n => {
      if (neighbours.includes(n.id) || n.id === node.id) {
        n.data.connected = isConnected;
      } else {
        n.data.connected = false;
      }
    });
  }

  expandCollapse(path: string[]): void {
    this.resume = this.cvDataService.toggleExpanded(this.resume, path);
    this.graph = this.cvDataService.buildGraph(this.resume);
  }

  clusterMouseEnter(event: MouseEvent): void {
    const el: Element = event.target as Element;
    if (!el.classList.contains("hovered")) {
      el.classList.add("hovered");
    }
  }

  clusterMouseLeave(event: MouseEvent): void {
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
