import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgxGraphModule } from '@swimlane/ngx-graph';
import { ResumeService } from './resume/resume.service';
import { ConfigService } from './config-service';
import { VectorDate } from './datePipe';
import { DetailsComponent } from './details/details.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ExperienceSubtitleComponent } from './details/experience-subtitle/experience-subtitle.component';
import { MarkdownModule } from 'ngx-markdown';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { DurationPipe } from './durationPipe';
import { ProjectSubtitleComponent } from './details/project-subtitle/project-subtitle.component';
import { BioComponent } from './bio/bio.component';

@NgModule({
  declarations: [
    AppComponent,
    DetailsComponent,
    ExperienceSubtitleComponent,
    ProjectSubtitleComponent,
    BioComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxGraphModule,
    VectorDate,
    DurationPipe,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
    MatIconModule
  ],
  providers: [ResumeService, ConfigService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
