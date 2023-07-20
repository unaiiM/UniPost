import { Component, Input } from '@angular/core';
import { Project } from "@ctypes/project";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {

  public JSON : JSON = JSON;
  public isLoading : boolean = true;
  public projects : Project[] = [{
    name: "New project",
    description: '',
    form: {
      name: "New project",
      description: ''
    },
    show: false,
    disabled: false
  }];

  public constructor(){
    this.loadScreens();
  };

  private loadScreens(){
    setTimeout(() => this.isLoading = false, 2000);
  };

  public handleProjectClick(project : Project) : void {
    if(!project.show){
      if(project.disabled)
        project.disabled = false;
      else {
        project.show = true;
        project.disabled = true
      };
    };
  };

  public handleArrowClick(project : Project) : void {
    if(project.show){
      project.form.name = project.name;
      project.form.description = project.description;
      project.show = false;
    };
  };

  public handleOpen(proj : Project) : void {

  };

  public handleSave(project : Project) : void {
    Object.assign(project, project.form);
    project.show = false;
  };

  public handleDelete(index : number) : void {
    this.projects.splice(index, 1);
  };

  public handleCreate() : void {
    this.projects.push({
      name: "New project",
      description: '',
      form: {
        name: "New project",
        description: ''
      },
      show: false,
      disabled: false
    });
  };

};
