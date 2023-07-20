import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ScreensServiceInfo } from '@workspace/types/screens';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  public type : string = 'project';
  public project : string;

  public constructor(private route: ActivatedRoute){};

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.project = params['name'];
    });
  };

}
