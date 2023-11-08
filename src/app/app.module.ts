import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgxGraphModule } from '../../../../../lib/ngx-graph/projects/swimlane/ngx-graph/src/lib/ngx-graph.module';
import { CvDataService } from './cv-data.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxGraphModule
  ],
  providers: [CvDataService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
