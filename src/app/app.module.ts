import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgxGraphModule } from '@swimlane/ngx-graph';
import { ResumeService } from './services/resume/resume.service';
import { ConfigService } from './services/config/config-service';
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
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ContactDialogComponent } from './register/contact-dialog/contact-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    DetailsComponent,
    ExperienceSubtitleComponent,
    ProjectSubtitleComponent,
    BioComponent,
    RegisterComponent,
    ContactDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxGraphModule,
    VectorDate,
    DurationPipe,
    MatCardModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    HttpClientModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
    MatIconModule,
    MatDialogModule,
  ],
  providers: [ResumeService, ConfigService, MatDialog],
  bootstrap: [AppComponent],
})
export class AppModule {
}
