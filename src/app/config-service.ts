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
    nodePadding: 20,
    edgePadding: 50,
    orientation: "TB"
  };

  public readonly layout = "dagreCluster";
}
