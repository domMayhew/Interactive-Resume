import * as _ from "lodash";

interface Resume {
  entries: ResumeTree[];
}

interface ResumeTree {
  readonly id: string,
  readonly label: string,
  readonly description?: string,
  readonly path?: string[],
  connected?: boolean,
  readonly children?: (Experience | ResumeTree)[],
  readonly neighbours?: string[],
  expanded?: boolean,
}

interface Experience extends ResumeTree {
  readonly start?: [number, number],
  readonly end?: [number, number],
  readonly location?: string,
  readonly title?: string,
}

export type {
  Resume,
  ResumeTree,
  Experience
}