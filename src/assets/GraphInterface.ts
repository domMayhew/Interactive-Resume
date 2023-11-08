interface CVData {
  [key: string]: CVEntry
  // experiences: Experience[];
  // skills: Skill[];
  // technologies: Technology[];
}

interface CVEntry {
  id: string;
  label: string;
  meta?: Meta;
  children?: CVEntry[];
  adjacent?: CVEntry[];
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

// interface Skill {
//   name: string;
//   id: string;
//   subskills?: Skill[]
// }

// interface Technology {
//   name: string;
//   id: string;
//   subTechnologies?: Technology[];
// }

export type {
  CVData,
  Meta,
  Experience,
  CVEntry
}