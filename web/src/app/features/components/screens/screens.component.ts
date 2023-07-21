import { Component, Input, OnInit } from '@angular/core';
import { Screen, ScreenInfo, Screens, ScreensInfo, ScreensServiceInfo } from "@ctypes/screens";
import { ScreensService } from '@workspace/apis/screens.service';
import { ScreenService } from '@workspace/core/services/screen.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-screens',
  templateUrl: './screens.component.html',
  styleUrls: ['./screens.component.css'],
})
export class ScreensComponent implements OnInit {

  @Input() public type : string = 'screens';
  @Input() public project : string | undefined = undefined;
  @Input() public path : string = decodeURIComponent(window.location.pathname.split("/").slice(0, -1).join("/"));
  public isLoading : boolean = true;
  public screensService : ScreensService;
  public screens : Screens = [];
  public defaultScreen : Screen = {
    name: "New window",
    project: '',
    description: '',
    form: {
      name: "New window",
      project: '',
      description: ''
    },
    show: false,
    disabled: false
  };
  public projects : string[] = ["Hello wold", "Some other"];

  public constructor(
    private screenService : ScreenService,
    private route: ActivatedRoute
  ){};

  private async loadScreens() : Promise<void> {
    const screensInfo : ScreensInfo = await this.screensService.load();
    console.log(screensInfo);
    screensInfo.forEach((info : ScreenInfo) => {
      const screen : Screen = {
        name: info.name,
        description: info.description,
        project: info.project,
        form: info,
        show: false,
        disabled: false
      };

      this.screens.push(screen);
    });

    setTimeout(() => this.isLoading = false, 2000);
  };

  public handleScreenClick(screen : Screen) : void {
    if(!screen.show){
      if(screen.disabled)
        screen.disabled = false;
      else {
        screen.show = true;
        screen.disabled = true
      };
    };
  };

  public handleArrowClick(screen : Screen) : void {
    if(screen.show){
      screen.form.name = screen.name;
      screen.form.description = screen.description;
      screen.show = false;
    };
  };

  public handleOpen(screen : Screen) : void  {

  };

  public async handleSave(index : number) : Promise<void> {
    const screen : Screen = this.screens[index];
    const info : ScreenInfo = screen.form;
    await this.screensService.modify(index, info);
    Object.assign(screen, screen.form);
    screen.show = false;
  };

  public async handleDelete(index : number) : Promise<void> {
    await this.screensService.delete(index);
    this.screens.splice(index, 1);
    if(this.screens.length === 0) this.handleCreate(); 
  };

  public async handleCreate() : Promise<void> {
    await this.screensService.create();
    this.screens.push(this.defaultScreen);
  };

  public ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      const id : number = Number(paramMap.get('id'));
      this.screenService.updateRequest("id " + id);
    });
    this.screensService = new ScreensService(this.type, this.project);
    this.loadScreens();
  };

};
