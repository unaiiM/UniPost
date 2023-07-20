import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './features/components/menu/menu.component';
import { ScreensComponent } from './features/components/screens/screens.component';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { FormsModule } from '@angular/forms';
import { ProjectsComponent } from './features/components/projects/projects.component';
import { ProjectComponent } from './features/components/project/project.component';
import { ScreenComponent } from './features/components/screen/screen.component';
import { ScreenService } from './apis/screen.service';
import { HistoryComponent } from './features/components/history/history.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ScreensComponent,
    LoadingComponent,
    ProjectsComponent,
    ProjectComponent,
    ScreenComponent,
    HistoryComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ScreenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
