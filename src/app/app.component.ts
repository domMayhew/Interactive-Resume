import { Component } from '@angular/core';
import { Node, Edge, Graph } from '@swimlane/ngx-graph';
import { ResumeService } from './resume/resume.service';
import { Experience, Resume, ResumeTree, Bio } from './resume/resume.model';
import { Observable, Subject } from 'rxjs';
import { ConfigService } from './config-service';
import typia from 'typia';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ResumeService]
})
export class AppComponent {

  constructor(private readonly resumeService: ResumeService, private readonly config: ConfigService) { };

  readonly title = 'icv';


  public readonly layoutSettings = this.config.layoutSettings;
  public readonly layout = this.config.layout;
  public readonly nodeConfig = this.config.nodeConfig;
  public readonly clusterConfig = this.config.clusterConfig;

  private resume: Resume = this.resumeService.buildResume(this.config.jsonResume);
  graph: Graph = this.resumeService.buildGraph(this.resume);

  selectedRTree: ResumeTree = this.resume.entries[0];
  detailsOpen: boolean = false;

  public readonly bio: Bio = this.resume.bio;

  connectedEdges(node: Node): Edge[] {
    return this.graph.edges.filter(e => e.source == node.id || e.target == node.id);
  }

  /** NODES **/
  // Events
  setConnections(node: Node, isConnected: boolean): void {
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

  expandNode(node: Node): void {
    if (this.isExpandable(node)) {
      this.expandCollapse(node);
    }
  }

  showNodeDetails(node: Node): void {
    this.selectedRTree = node.data?.rTree || {};
    this.detailsOpen = true;
  }
  closeDetails(): void { this.detailsOpen = false };

  // Helpers
  nodeWidth(node: Node): number {
    return node.dimension?.width || this.nodeConfig.dimensions.width;
  }

  nodeHeight(node: Node): number {
    return node.dimension?.height || this.nodeConfig.dimensions.height;
  }

  isExpandable(node: Node): boolean {
    return (node.data?.rTree?.children?.length || 0) > 0;
  }

  hasDetails(node: Node): boolean {
    return typia.is<Experience>(node.data?.rTree || {}) || node.data?.rTree?.description != null;
  }

  /** CLUSTER EVENTS **/
  collapseCluster(node: Node): void {
    this.expandCollapse(node);
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
    }
  }

  /** COMMON EVENTS **/
  expandCollapse(node: Node): void {
    this.resume = this.resumeService.toggleExpanded(this.resume, node.data?.path);
    this.graph = this.resumeService.buildGraph(this.resume);
  }

  /** BIO **/
  showBio() {
    this.selectedRTree = this.bio || {};
    this.detailsOpen = true;
  }
}
