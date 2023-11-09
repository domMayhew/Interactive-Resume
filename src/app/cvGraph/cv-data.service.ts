import { Injectable } from '@angular/core';
import { assertEquals, validateEquals } from 'typia';
import { Node, Edge, ClusterNode, Graph } from '@swimlane/ngx-graph';

import { Experience, Resume, ResumeTree } from './cvData.model';
import resumeJson from "../../assets/cv.json";
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class CvDataService {
  constructor() {
  }

  getInitResume(): Resume {
    const resume = resumeJson as Resume;
    const validation = validateEquals<Resume>(resume);
    if (validation.errors.length > 0) {
      console.error(validation.errors);
      console.error(resume);
      throw new Error("Resume JSON does not match spec.");
    }
    return resume;
  }

  buildGraph(resume: Resume): Graph {
    return {
      nodes: this.leafNodes(resume),
      clusters: this.clusterNodes(resume),
      edges: this.edges(resume)
    }
  }

  toggleExpanded(rTree: ResumeTree): void {
    rTree.expanded = !rTree["expanded"];
    (rTree.children || []).forEach((child: any) => child.expanded = false)
  }


  /**
   * NODES
   */

  private areChildrenDisplayed = (entry: ResumeTree): boolean => {
    return entry.children !== undefined && entry.children.length > 0 && entry.expanded === true;
  }

  clusterNodes(resume: Resume): ClusterNode[] {
    const entry2Cluster = (entry: ResumeTree, parentId?: string): ClusterNode => {
      return {
        id: entry.id,
        label: entry.label,
        data: entry,
        parentId: parentId,
        childNodeIds: _.map(entry.children || [], child => child.id)
      }
    }

    const computeSubTree = (parentId?: string) => (entry: ResumeTree): Node[] => {
      if (this.areChildrenDisplayed(entry)) {
        const currCompound = entry2Cluster(entry, parentId);
        const children = _.flatMap(entry.children, computeSubTree(entry.id));
        return [currCompound, ...children];
      } else {
        return [];
      }
    }

    return _.flatMap(resume.entries, computeSubTree());
  }


  leafNodes(resume: Resume): Node[] {
    const entry2Node = (rTree: ResumeTree, parentId?: string): Node => {
      return {
        ...rTree,
        data: rTree,
        parentId
      }
    }

    const computeSubTree = (parentId?: string) => (entry: ResumeTree): Node[] => {
      if (this.areChildrenDisplayed(entry)) {
        return _.flatMap(entry.children, computeSubTree(entry.id));
      } else {
        return [entry2Node(entry, parentId)];
      }
    }

    return _.flatMap(resume.entries, entry => computeSubTree()(entry));
  }

  /*
   * EDGES
   */

  // Get edges where edges of hidden children are mapped to the closest shown parent
  edges = (resume: Resume): Edge[] => {
    return _.flatMap(
      resume.entries,
      rTree => this.collapseEdges(resume, this.rawEdges(rTree))
    );
  }

  // Map edges of hidden children to closest shown parent
  collapseEdges(resume: Resume, edges: Edge[]): Edge[] {
    // Make a map from childId -> id of the first unopened parent
    const makeChildAncestorMap = (shownAncestor?: ResumeTree) => (rTree: ResumeTree): Map<string, string> => {
      // Map top level entries. Is empty if entries is empty (i.e., was called from a "parent" with no children)
      const currMapping: string = shownAncestor ? shownAncestor.id : rTree.id;
      const newAncestor = shownAncestor ? shownAncestor : (this.areChildrenDisplayed(rTree) ? undefined : rTree);
      const childMappings = _.map(rTree.children, makeChildAncestorMap(newAncestor));

      // Combine maps of all top-level entries.
      return _.reduce(childMappings, (m1, m2) => {
        m1.forEach((v, k) => m2.set(k, v));
        return m2;
      }, new Map<string, string>([[rTree.id, currMapping]]));
    };

    // Build the map
    const mergeMaps = (m1: Map<string, string>, m2: Map<string, string>): Map<string, string> => {
      m1.forEach((v: string, k: string) => {
        m2.set(k, v);
      });
      return m2;
    }
    const childAncestorMaps = _.map(resume.entries, rTree => makeChildAncestorMap()(rTree));
    const childAncestorMap = _.reduce(
      childAncestorMaps,
      mergeMaps,
      new Map<string, string>()
    );

    // Remap edges
    return _.map(edges, edge => Object.assign(edge,
      { source: childAncestorMap.get(edge.source), target: childAncestorMap.get(edge.target) }
    ));
  }

  // Return all the edges, not processing shown/hidden children at all
  rawEdges(rTree: ResumeTree): Edge[] {
    const currEdges: Edge[] = _.map(rTree.neighbours || [], neighbourId => this.makeEdge(rTree.id, neighbourId));
    const childEdges = _.flatMap(rTree.children || [], child => this.rawEdges(child));
    return [...currEdges, ...childEdges];
  }

  makeEdge(source: string, destination: string): Edge {
    return {
      id: `${source}2${destination}`,
      source: source,
      target: destination,
    }
  }
}
