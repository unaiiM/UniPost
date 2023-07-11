import { Component } from '@angular/core';
import { Screen } from 'src/app/types/screens';

@Component({
  selector: 'app-screens',
  templateUrl: './screens.component.html',
  styleUrls: ['./screens.component.css']
})
export class ScreensComponent {

  public isLoading : boolean = true;
  public screens : Screen[] = [];

  public constructor(){
    this.loadScreens();
  };

  private loadScreens(){
    setTimeout(() => this.isLoading = false, 2000);
  };

};
