import { TestBed } from '@angular/core/testing';

import { CvDataService } from './cv-data.service';
import { validateEquals } from 'typia';
import { Resume, ResumeTree } from './cvData.model';
import * as _ from 'lodash';
import { Edge } from '@swimlane/ngx-graph';
import { ConfigService } from '../config-service';

const testResume: Resume = {
  entries: [
    {
      id: "0",
      label: "0",
      expanded: true,
      children: [
        {
          id: "0.0",
          label: "0.0",
          expanded: false,
          neighbours: ["1", "1.1"],
          children: [
            {
              id: "0.0.0",
              label: "0.0.0",
              expanded: false,
              neighbours: ["1.1"]
            }
          ]
        },
        {
          id: "0.1",
          label: "0.1"
        }
      ]
    },
    {
      id: "1",
      label: "1",
      expanded: false,
      children: [
        {
          id: "1.0",
          label: "1.0"
        },
        {
          id: "1.1",
          label: "1.1"
        }
      ]
    }
  ]
}

describe('CvDataService', () => {
  let service: CvDataService;
  let config = new ConfigService();

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CvDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('json should match interface', () => {
    expect(validateEquals<Resume>(service.buildResume(config.jsonResume)).errors).toEqual([]);
  })

  it('all entries should have unique IDs', () => {
    const ids = new Set<string>();
    service.resumeIterate(service.buildResume(config.jsonResume), (rTree: ResumeTree) => {
      expect(ids).not.toContain(rTree.id);
      ids.add(rTree.id);
    });
  })

  it('all neighbours should be real', () => {
    const getIds = (entry: ResumeTree): string[] => {
      const childIds: string[] = _.flatMap(entry.children || [], getIds);
      return [entry.id, ...childIds];
    }

    const getNeighbourIds = (entry: ResumeTree): string[] => {
      const childNeighbourIds: string[] = _.flatMap(entry.children || [], getNeighbourIds);
      return [...(entry.neighbours || []), ...childNeighbourIds];
    }

    const resume: Resume = service.buildResume(config.jsonResume)
    const ids = _.flatMap(resume.entries, getIds);
    const neighbours = _.flatMap(resume.entries, getNeighbourIds);
    neighbours.forEach(neighbour => {
      expect(ids).toContain(neighbour);
    });
  })

  it('should collapse edges', () => {
    const edges: Edge[] = service.edges(testResume);
    expect(edges.length).toEqual(3);
    // Unaffected edge
    expect([edges[0].source, edges[0].target]).toEqual(["0.0", "1"]);
    // Target affected
    expect([edges[1].source, edges[1].target]).toEqual(["0.0", "1"]);
    // Source and target affected
    expect([edges[2].source, edges[2].target]).toEqual(["0.0", "1"]);
  })

  it('paths should be correct', () => {
    const graph = service.buildGraph(testResume);
    const zeroPath = graph.clusters?.find(n => n.id === "0")?.data.path;
    const zeroZeroPath = graph.nodes.find(n => n.id === "0.0")?.data.path;
    const zeroOnePath = graph.nodes.find(n => n.id === "0.1")?.data.path;
    const onePath = graph.nodes?.find(n => n.id === "1")?.data.path;
    expect(zeroPath).toEqual(["0"]);
    expect(zeroZeroPath).toEqual(["0", "0.0"]);
    expect(zeroOnePath).toEqual(["0", "0.1"]);
    expect(onePath).toEqual(["1"]);
  })

  it('should find the correct subtree for a given path', () => {
    const rTree = service.rTreeAtPath(testResume, ["0", "0.0"]);
    expect(rTree).toBe((testResume.entries[0].children || [])[0]);
  })
});
