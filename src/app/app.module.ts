import { NgModule, SecurityContext } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgxGraphModule } from '@swimlane/ngx-graph';
// import { MarkdownModule } from 'ngx-markdown';
import { CvDataService } from './cvGraph/cv-data.service';
import { ConfigService } from './config-service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxGraphModule,
  ],
  providers: [CvDataService, ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
