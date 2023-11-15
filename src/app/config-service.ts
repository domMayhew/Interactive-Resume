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
    edgePadding: 45,
    rankPadding: 100,
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
    rounding: {
      x: 2,
      y: 2
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
    offset: {
      x: 0,
      y: 20
    },
    rounding: {
      x: 4,
      y: 4
    },
    textOffset: {
      x: 0,
      y: 14
    },
    durationPadding: {
      x: 50,
      y: 30
    },
    locationPadding: {
      x: 20,
      y: 30
    },
    openDetails: {
      dimension: {
        width: 26,
        height: 26
      },
      padding: {
        x: 45,
        y: 0
      },
      offset: {
        x: 0,
        y: 10.5 + 20
      },
      opacity: 1,
      clickboxOffset: {
        x: 45,
        y: 10.5 + 20
      }
    }
  }

  public readonly bio = {
    profile: {
      width: 2540,
      height: 2540
    },
    circle: {
      cx: 50,
      cy: 50,
      r: 50
    },
    textbox: {
      actualWidth: 100,
      actualHeight: 30,
      width: 100 * 2540 / (50 * 2),
      height: 30 * 2540 / (50 * 2),
      rx: 2 * 2540 / (50 * 2),
      ry: 2 * 2540 / (50 * 2),
    },
    strokeWidth: 30
  }

  public readonly layout = "dagreCluster";
}
