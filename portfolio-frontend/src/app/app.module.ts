import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './features/home/home/home.component';
import { AboutComponent } from './features/about/about/about.component';
import { ProjectsComponent } from './features/projects/projects/projects.component';
import { ContactComponent } from './features/contact/contact/contact.component';
import { TogetherComponent } from './features/together/together/together.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ProjectsComponent,
    ContactComponent,
    TogetherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
