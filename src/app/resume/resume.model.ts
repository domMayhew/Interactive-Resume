import * as _ from "lodash";

interface Resume {
  bio: Info,
  welcome: Info,
  entries: ResumeTree[];
}

interface Info {
  readonly id: string,
  readonly label: string,
  readonly description: string
}

interface Bio extends Info {
  readonly image: string
}

interface ResumeTree {
  readonly id: string,
  readonly label: string,
  readonly description?: string,
  readonly path?: string[],
  connected?: boolean,
  readonly children?: ResumeTree[],
  readonly neighbours?: string[],
  expanded?: boolean,
}

interface Experience extends ResumeTree {
  readonly start: [number, number],
  readonly end?: [number, number],
  readonly location?: string,
  readonly title?: string,
}

interface Class extends ResumeTree {
  readonly grade?: string,
  readonly level?: string
}

interface Project extends ResumeTree {
  readonly language: string,
  readonly link?: string,
  readonly github?: string,
}

export type {
  Resume,
  ResumeTree,
  Experience,
  Class,
  Project,
  Info
}