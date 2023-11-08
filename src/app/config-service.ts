import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  readonly config: any = {
    widthFactor: 10,
    height: 30
  }
}
