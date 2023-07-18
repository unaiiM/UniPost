import { Component } from '@angular/core';
import { Screen } from "@ctypes/screen/index";

@Component({
  selector: 'app-screens',
  templateUrl: './screens.component.html',
  styleUrls: ['./screens.component.css']
})
export class ScreensComponent {

  public isLoading : boolean = true;
  public screens : Screen[] = [{
    name: "New window",
    show: false
  }];
  public projects : string[] = ["Hello wold", "Some other"];

  public constructor(){
    this.loadScreens();
  };

  private loadScreens(){
    setTimeout(() => this.isLoading = false, 2000);
  };

  public handleArrowClick(screen : Screen) : void {
    screen.show = !screen.show;
  };

};
