import * as _ from 'lodash';
import { Node, Edge, ClusterNode } from '@swimlane/ngx-graph';
import {
  CVData,
  CVEntry,
  Experience,
} from './GraphInterface';

/**
 * Technologies
 */

const languages: CVEntry[] = [
  { label: "JavaScript", id: "js" },
  { label: "TypeScript", id: "ts" },
  { label: "Scala", id: "scala" },
  { label: "Haskell", id: "hs" },
  { label: "C/C++", id: "cpp" },
  { label: "Bash", id: "bash" },
  { label: "SQL", id: "sql" }
]

const backendTechnologies: CVEntry[] = [
  { label: "RESTful APIs", id: "apis" },
  { label: "MEAN", id: "mean" },
  { label: "OpenAPI & SwaggerUI", id: "swagger" },
  { label: "Play! Framework", id: "play" }
]

const frontEndTechnologies: CVEntry[] = [
  { label: "Express", id: "expr" },
  { label: "Angular", id: "ng" },
  { label: "React", id: "react" }
]

const databaseTechnologies: CVEntry[] = [
  { label: "MySQL", id: "mysql" },
  { label: "SQLite", id: "sqlite" },
  { label: "MongoDB", id: "mongo" },
  { label: "Postgre", id: "postgre" }
]

const engineeringTechnologies: CVEntry[] = [
  { label: "Git", id: "git" },
  { label: "Jira", id: "git" },
  { label: "GitHub", id: "github" },
  { label: "BitBucket", id: "bitbucket" },
  { label: "ScalaTest & Mockito", id: "scalatest" },
  { label: "Linux & Bash scripting", id: "linux" }
]

const securityTechnologies: CVEntry[] = [
  { label: "SAML 2.0", id: "saml" }
]

const technologies: CVEntry[] = [
  {
    label: "Web Technologies",
    id: "web",
    children: [
      {
        label: "Front End Technologies",
        id: "frontend",
        children: frontEndTechnologies
      },
      {
        label: "Back End Technologies",
        id: "backend",
        children: backendTechnologies
      }
    ]
  },
  {
    label: "Database Technologies",
    id: "db",
    children: databaseTechnologies
  },
  {
    label: "Software Engineering Process Technologies",
    id: "eng",
    children: engineeringTechnologies
  },
  {
    label: "Security and Authentication Technologies",
    id: "sec",
    children: securityTechnologies
  },
  {
    label: "Programming and Scripting Languages",
    id: "lang",
    children: languages
  }
]

/**
 *CVEntryS
 */

const cvEntrys: CVEntry[] = [
  { id: "requirements", label: "*Analyze* and *design* functional, nonfunctional, and security *requirements*" },
  { id: "architecture", label: "Develop and communicate software *architecture* and *designs*" }
]

/**
 * VISIER
 */
const batchErrors: CVEntry = {
  label: "Batch Job Error Handling",
  id: "batch",
}

const visierApis: CVEntry = {
  label: "RESTful API Endpoints",
  id: "visierApis",
}

const exemplar: CVEntry = {
  label: "Example and Test Enablement Application",
  id: "exemplar",
}

const swaggerUI: CVEntry = {
  label: "Custom UI for API Documentation",
  id: "visierSwagger",
}

const visier: CVEntry = {
  label: "Visier Inc.",
  id: "visier",
  meta: {
    "Job Title": "Software Development Coop",
    "Date": "Sep 2022 - Apr 2023",
    "Duration": "8 months",
    "Location": "Vancouver, BC (Hybrid)"
  },
  children: [batchErrors, visierApis, exemplar, swaggerUI]
}

/**
 * ACADEMIC
 */

const academic: CVEntry = {
  label: "Academic",
  id: "academic",
  meta: {
    "University": "Thompson Rivers University",
    "Degree": "Bachelor of Computing Science",
    "Date": "Mar 2021 - Jan 2023",
    "Duration": "2 years, 10 months",
    "Location": "Remote"
  },
}

/**
 * PROJECTS
 */

const projects: CVEntry = {
  label: "Projects",
  id: "projects",
}

/**
 * LIFE
 */

const life: CVEntry = {
  label: "Life Experiences",
  id: "life",
}

const experiencesCategories: CVEntry[] = [
  visier, academic, projects, life
]

/**
 * BIO
 */

const bio: string = ""

/**
 * GRAPH
 */

// const graphData: GraphData = {
//   experiences: [visier, academic, projects, life],
//   CVEntrys,
//   technologies,
//   bio
// }

// function nodesFromExp(parentId?: string): (e: Experience) => Node[] { // TODO: Parent ID
//   return function (e: Experience): Node[] {
//     const node: Node = {
//       id: e.id,
//       label: e.name,
//       meta: e.meta,
//       dimension: {
//         width: e.name.length * 10,
//         height: 50
//       }
//     }
//     const childNodes: Node[][] = _.map(e!.subExperiences, nodesFromExp(e.name))
//     return _.flatten(childNodes).concat(node)
//   }
// }

// const experienceNodes = _.flatten(_.map(graphData.experiences, nodesFromExp(undefined)))
// const edges: Edge[] = [
//   {
//     id: 'vbatch',
//     label: 'Project',
//     source: 'visier',
//     target: 'batch'
//   },
//   {
//     id: 'vApisEdge',
//     label: 'Project',
//     source: 'visier',
//     target: 'visierApis'
//   },
//   {
//     id: 'exemplarAcademicEdge',
//     label: 'Not a project',
//     source: 'exemplar',
//     target: 'academic'
//   }
// ]

export {

}