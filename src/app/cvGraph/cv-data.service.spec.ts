import { TestBed } from '@angular/core/testing';

import { CvDataService } from './cv-data.service';
import { validateEquals } from 'typia';
import { Resume, ResumeTree } from './cvData.model';
import * as _ from 'lodash';
import { Edge } from '@swimlane/ngx-graph';

const resumeIterate = (resume: Resume, fn: (rt: ResumeTree) => void): void => {
  const go = (rt: ResumeTree) => {
    fn(rt);
    (rt.children || []).forEach(go);
  }
  resume.entries.forEach(go);
}

describe('CvDataService', () => {
  let service: CvDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CvDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('json should match interface', () => {
    expect(validateEquals<Resume>(service.getInitResume()).errors).toEqual([]);
  })

  it('all entries should have unique IDs', () => {
    const ids = new Set<string>();
    resumeIterate(service.getInitResume(), (rTree: ResumeTree) => {
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

    const resume: Resume = service.getInitResume()
    const ids = _.flatMap(resume.entries, getIds);
    const neighbours = _.flatMap(resume.entries, getNeighbourIds);
    neighbours.forEach(neighbour => {
      expect(ids).toContain(neighbour);
    });
  })

  it('should collapse edges', () => {
    const resume: Resume = {
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
            }
          ]
        },
        {
          id: "1",
          label: "1",
          expanded: false,
          children: [
            {
              id: "1.1",
              label: "1.1"
            }
          ]
        }
      ]
    }
    const edges: Edge[] = service.edges(resume);
    expect(edges.length).toEqual(3);
    // Unaffected edge
    expect([edges[0].source, edges[0].target]).toEqual(["0.0", "1"]);
    // Target affected
    expect([edges[1].source, edges[1].target]).toEqual(["0.0", "1"]);
    // Source and target affected
    expect([edges[2].source, edges[2].target]).toEqual(["0.0", "1"]);
  })
});
