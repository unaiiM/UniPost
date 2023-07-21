import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScreenService } from '@workspace/core/services/screen.service';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.css']
})
export class ScreenComponent implements OnInit {

  public id : number;
  public request : string = "";
  public response : string = "";

  public constructor(
    private screenService : ScreenService,
    private route: ActivatedRoute
  ){};

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.screenService.request$.subscribe((req : string) => {
      this.request = req;
    });
  };

}
