interface CVData {
  entries: CVEntry[];
  edges: [string, string][];
  // experiences: Experience[];
  // skills: Skill[];
  // technologies: Technology[];
}

interface CVEntry {
  id: string;
  label: string;
  meta?: Meta;
  children?: CVEntry[];
}

interface Experience extends CVEntry {
  start: Date;
  end: Date;
  location: string;
  title: string;
}

interface Meta {
  [key: string]: string;
}

export type {
  CVData,
  Meta,
  Experience,
  CVEntry
}