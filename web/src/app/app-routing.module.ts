import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScreensComponent } from './features/components/screens/screens.component';
import { ProjectsComponent } from './features/components/projects/projects.component';
import { ProjectComponent } from './features/components/project/project.component';
import { HistoryComponent } from './features/components/history/history.component';

const routes: Routes = [
  { path: '', redirectTo: 'screens/0', pathMatch: "full" },
  { path: 'screens', redirectTo: "screens/0" },
  { path: 'screens/:id', component: ScreensComponent },
  { path: 'projects', children: [
    { path: '', component: ProjectsComponent },
    { path: 'project/:name', redirectTo : 'project/:name/0' },
    { path: 'project/:name/:id', component: ProjectComponent }
  ]},
  { path: 'history', redirectTo: "history/0" },
  { path: 'history/:id', component: HistoryComponent },
  { path: 'config', component: ScreensComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
