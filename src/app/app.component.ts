import { Component } from '@angular/core';
import { Node } from '@swimlane/ngx-graph';
import { assertEquals } from 'typia';
// import { experienceNodes, edges } from 'src/assets/graph';
import { CvDataService } from './cv-data.service';
import cvJson from '../assets/cv.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // providers: [CvDataService]
})
export class AppComponent {

  constructor(private readonly cvDataService: CvDataService) { };

  title = 'icv';

  ngOnInit() {
    // console.log(this.cvDataService.cvData);
    console.log(cvJson);
  }
}
