import { Injectable } from '@angular/core';
import { assertEquals } from 'typia';
import { Node, Edge } from '@swimlane/ngx-graph';

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
  leafNodes(): Node[] {
    return this.subTreeNodes(this.cvData.entries);
  }

  private subTreeNodes(entries: CVEntry[]): Node[] {
    return _.flatten(_.map(
      entries,
      (entry) => entry.children ? this.subTreeNodes(entry.children) : this.node(entry)
    ));
  }

  node(cve: CVEntry): Node {
    const width = cve.label.length * this.configService.config.widthFactor;
    const height = this.configService.config.height;
    return {
      ...cve,
      dimension: {
        width, height
      }
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
