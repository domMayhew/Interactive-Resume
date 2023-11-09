import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgxGraphModule } from '@swimlane/ngx-graph';
// import { MarkdownModule } from 'ngx-markdown';
import { ResumeService } from './resume/resume.service';
import { ConfigService } from './config-service';
import { VectorDate } from './datePipe';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxGraphModule,
    VectorDate,
  ],
  providers: [ResumeService, ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
