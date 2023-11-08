import { Injectable } from '@angular/core';
import { assertEquals } from 'typia';

import { CVData } from 'src/assets/GraphInterface';
import cvFile from "../assets/cv.json";

@Injectable({
  providedIn: 'root'
})
export class CvDataService {
  readonly cvData: CVData;

  constructor() {
    assertEquals<CVData>(cvFile);
    this.cvData = cvFile as CVData;
  }
}
