import { Injectable } from '@angular/core';
import jsonResume from '../assets/cv.json';
@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  public readonly jsonResume: Object = jsonResume;

  public readonly layoutSettings = {
    multigraph: false,
    nodePadding: 0,
    edgePadding: 60,
    rankPadding: 150,
    orientation: "LR"
  };

  public readonly nodeConfig = {
    translate: {
      x: 1,
      y: 1
    },
    dimensions: {
      width: 600,
      height: 30
    },
    durationPadding: 40,
    openDetails: {
      padding: {
        x: 27,
        y: 0
      },
      offset: {
        x: 0,
        y: 4
      },
      dimension: {
        width: 24,
        height: 24
      },
      opacity: 0.75
    }
  }

  public readonly clusterConfig = {
    headerHeight: 40,
    padding: {
      x: 20,
      y: 20
    },
    rounding: {
      x: 2,
      y: 2
    },
    textOffset: {
      x: 0,
      y: 11
    },
    durationPadding: {
      x: 20,
      y: 30
    },
    locationPadding: {
      x: 20,
      y: 30
    }
  }

  public readonly layout = "dagreCluster";
}
