import { Injectable } from '@angular/core';
import jsonResume from '../../../assets/cv.json';
@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  public readonly jsonResume: Object = jsonResume;

  public readonly layoutSettings = {
    multigraph: false,
    nodePadding: 20,
    edgePadding: 45,
    rankPadding: 100,
    orientation: "LR",
    marginY: 400
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
    expandableRectOffset: {
      x: 5,
      y: 5
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
      y: 9
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

  public readonly profileRawDimension = {
    width: 1597,
    height: 1597
  }

  public readonly profileCircleActualDimension = {
    cx: 37.5,
    cy: 37.5,
    r: 75
  }

  public readonly bio = {
    textbox: {
      actualWidth: 110,
      actualHeight: 30,
      width: 110 * this.profileRawDimension.width / (this.profileCircleActualDimension.r * 2),
      height: 30 * this.profileRawDimension.height / (this.profileCircleActualDimension.r * 2),
      rx: 2 * this.profileRawDimension.width / (this.profileCircleActualDimension.r * 2),
      ry: 2 * this.profileRawDimension.height / (this.profileCircleActualDimension.r * 2),
    },
    strokeWidth: 30
  }

  public readonly zoom = {
    initial: 0.45,
    max: 0.9,
    min: 0.45
  }

  public readonly layout = "dagreCluster";
}
