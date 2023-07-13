import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScreensComponent } from './features/components/screens/screens.component';

const routes: Routes = [
  { path: 'screens', component: ScreensComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
