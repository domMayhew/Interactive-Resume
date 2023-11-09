import { Injectable } from '@angular/core';
import { assertEquals, validateEquals } from 'typia';
import { Node, Edge, ClusterNode, Graph } from '@swimlane/ngx-graph';

import { Resume, ResumeTree } from './resume.model';
import * as _ from 'lodash';
import { ConfigService } from '../config-service';

@Injectable({
  providedIn: 'root',
})
export class ResumeService {
  constructor(private readonly config: ConfigService) {
  }

  buildResume(jsonResume: Object): Resume {
    const resume: Resume = jsonResume as Resume;
    const validation = validateEquals<Resume>(resume);
    if (validation.errors.length > 0) {
      console.error(validation.errors);
      console.error(resume);
      throw new Error("JSON Resume does not match spec.");
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

  toggleExpanded(resume: Resume, path: string[]): Resume {
    const newResume = this.deepMerge({}, resume);
    const rTree = this.rTreeAtPath(resume, path);
    rTree.expanded = !rTree["expanded"];
    (rTree.children || []).forEach((child: any) => child.expanded = false);
    return newResume;
  }

  /**
   * NODES
   */

  private areChildrenDisplayed = (rTree: ResumeTree): boolean => {
    return rTree.children !== undefined && rTree.children.length > 0 && rTree.expanded === true;
  }

  clusterNodes(resume: Resume): ClusterNode[] {
    const entry2Cluster = (rTree: ResumeTree, path: string[], parentId?: string): ClusterNode => {
      return {
        id: rTree.id,
        label: rTree.label,
        data: { rTree, path, connected: rTree.connected || false },
        parentId,
        childNodeIds: _.map(rTree.children || [], child => child.id)
      }
    }

    const computeSubTree = (path: string[], parentId?: string) => (rTree: ResumeTree): Node[] => {
      if (this.areChildrenDisplayed(rTree)) {
        const currCompound = entry2Cluster(rTree, [...path, rTree.id], parentId);
        const children = _.flatMap(rTree.children, computeSubTree([...path, rTree.id], rTree.id));
        return [currCompound, ...children];
      } else {
        return [];
      }
    }

    return _.flatMap(resume.entries, computeSubTree([]));
  }

  leafNodes(resume: Resume): Node[] {
    const entry2Node = (rTree: ResumeTree, path: string[], parentId?: string): Node => {
      return {
        id: rTree.id,
        label: rTree.label,
        parentId,
        data: { rTree, path, connected: rTree.connected || false },
        dimension: this.config.nodeDimensions
      }
    }

    const computeSubTree = (path: string[], parentId?: string) => (rTree: ResumeTree): Node[] => {
      if (this.areChildrenDisplayed(rTree)) {
        return _.flatMap(rTree.children, computeSubTree([...path, rTree.id], rTree.id));
      } else {
        return [entry2Node(rTree, [...path, rTree.id], parentId)];
      }
    }

    return _.flatMap(resume.entries, entry => computeSubTree([])(entry));
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
  collapseEdges(resume: Resume, rawEdges: Edge[]): Edge[] {
    // Make a map from childId -> id of the first unopened parent
    const makeChildAncestorMap = (ancestorConnected: boolean, shownAncestor?: ResumeTree) => (rTree: ResumeTree): Map<string, [string, boolean]> => {
      // Map top level entries. Is empty if entries is empty (i.e., was called from a "parent" with no children)
      const currAncestor = shownAncestor ? shownAncestor.id : rTree.id;
      const currConnected = rTree.connected || ancestorConnected || false;
      const newAncestor = shownAncestor ? shownAncestor : (this.areChildrenDisplayed(rTree) ? undefined : rTree);
      const childMappings = _.map(rTree.children, makeChildAncestorMap(currConnected, newAncestor));

      // Combine maps of all top-level entries.
      return _.reduce(childMappings, (m1, m2) => {
        m1.forEach((v, k) => m2.set(k, v));
        return m2;
      }, new Map<string, [string, boolean]>([[rTree.id, [currAncestor, currConnected]]]));
    };

    // Build the map
    const mergeMaps = (m1: Map<string, [string, boolean]>, m2: Map<string, [string, boolean]>): Map<string, [string, boolean]> => {
      m1.forEach((v: [string, boolean], k: string) => {
        const [m1Ancestor, m1Connected] = m1.get(k) || ["", false];
        const [m2Ancestor, m2Connected] = m2.get(k) || ["", false];
        m2.set(k, [m1Ancestor, m1Connected || m2Connected]);
      });
      return m2;
    }

    const childAncestorMaps = _.map(resume.entries, rTree => makeChildAncestorMap(rTree.connected || false)(rTree));
    const childAncestorMap = _.reduce(
      childAncestorMaps,
      mergeMaps,
      new Map<string, [string, boolean]>()
    );

    // Remap edges
    const remappedEdges = _.map(rawEdges, edge => {
      const [source, sourceConnected] = childAncestorMap.get(edge.source) || [];
      const [target, targetConnected] = childAncestorMap.get(edge.target) || [];
      return { source, target, data: { connected: sourceConnected || targetConnected || false } } as Edge;
    });
    return remappedEdges;
  }

  // Return all the edges, not processing shown/hidden children at all
  rawEdges(rTree: ResumeTree): Edge[] {
    const currEdges: Edge[] = _.map(
      rTree.neighbours || [], neighbourId => this.makeEdge(rTree.id, neighbourId, rTree.connected || false));
    const childEdges = _.flatMap(rTree.children || [], child => this.rawEdges(child));
    return [...currEdges, ...childEdges];
  }

  makeEdge(source: string, destination: string, isConnected: boolean): Edge {
    return {
      id: `${source}2${destination}`,
      source: source,
      target: destination,
      data: {
        connected: isConnected
      }
    }
  }

  resumeIterate(resume: Resume, fn: (rt: ResumeTree) => void): void {
    const go = (rt: ResumeTree) => {
      fn(rt);
      (rt.children || []).forEach(go);
    }
    resume.entries.forEach(go);
  }

  rTreeAtPath(resume: Resume, path: string[]): ResumeTree {
    const go = (rTree: ResumeTree, path: string[]): ResumeTree => {
      if (path.length === 0) {
        return rTree;
      } else {
        const child = rTree.children?.find(rt => rt.id === _.head(path));
        if (child === undefined) {
          throw new Error("Path does not exist.");
        }
        return go(child, _.tail(path));
      }
    }
    return go({ id: "", label: "", children: resume.entries } as ResumeTree, path);
  }

  deepMerge(target: any, ...sources: any): any {
    const isObject = (item: any): boolean => {
      return (item && typeof item === 'object' && !Array.isArray(item));
    }

    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
      for (const key in source) {
        if (isObject(source[key])) {
          if (!target[key]) Object.assign(target, { [key]: {} });
          this.deepMerge(target[key], source[key]);
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      }
    }

    return this.deepMerge(target, ...sources);
  }
}
