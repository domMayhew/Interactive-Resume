interface CVData {
  entries: CVEntry[];
  edges: [string, string][];
}

interface CVEntry {
  id: string;
  label: string;
  meta?: Meta;
  children?: CVEntry[];
}

interface Experience extends CVEntry {
  start: [number, number];
  end: [number, number];
  location: string;
  title: string;
  description: string;
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