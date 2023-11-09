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

  public readonly nodeDimensions = {
    width: 600,
    height: 30
  }

  public readonly layout = "dagreCluster";
}
