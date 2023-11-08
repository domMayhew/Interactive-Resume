import { Injectable } from '@angular/core';
import { assertEquals } from 'typia';
import { Node, Edge, ClusterNode } from '../../../../../lib/ngx-graph/projects/swimlane/ngx-graph/src/lib/models';

import { CVData, CVEntry } from 'src/assets/GraphInterface';
import cvFile from "../assets/cv.json";
import { ConfigService } from './config-service';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class CvDataService {
  readonly cvData: CVData;

  constructor(private configService: ConfigService) {
    assertEquals<CVData>(cvFile);
    this.cvData = cvFile as CVData;
  }

  /**
   * NODES
   */
  clusterNodes(): ClusterNode[] {
    const entry2Cluster = (entry: CVEntry, parentId?: string): ClusterNode => {
      return {
        id: entry.id,
        label: entry.label,
        parentId: parentId,
        childNodeIds: _.map(entry.children, child => child.id)
      }
    }

    const computeSubTree = (parentId?: string) => (entry: CVEntry): Node[] => {
      if (entry.children) {
        const currCompound = entry2Cluster(entry);
        const children = _.flatMap(entry.children, computeSubTree(entry.id));
        return [currCompound, ...children];
      } else {
        return [];
      }
    }

    return _.flatMap(this.cvData.entries, computeSubTree());
  }


  leafNodes(): Node[] {
    const computeSubTree = (parentId?: string) => (entry: CVEntry): Node[] => {
      if (!entry.children) {
        return [this.entry2Node(entry, parentId)];
      } else {
        return _.flatMap(entry.children, computeSubTree(entry.id));
      }
    }

    return _.flatMap(this.cvData.entries, computeSubTree());
  }

  private entry2Node(cve: CVEntry, parentId?: string): Node {
    const width = cve.label.length * this.configService.config.widthFactor;
    const height = this.configService.config.height;
    return {
      ...cve,
      parentId,
      // dimension: {
      //   width, height
      // }
    }
  }

  /*
   * EDGES
   */
  edges(): Edge[] {
    return _.map(this.cvData.edges, this.edge)
  }

  edge([source, destination]: [string, string]): Edge {
    return {
      id: `${source}2${destination}`,
      source: source,
      target: destination,
    }
  }
}
