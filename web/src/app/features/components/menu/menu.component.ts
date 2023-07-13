import { Component } from '@angular/core';

interface Item {
  active: boolean;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  public showDefault : boolean = true;
  public items : Item[] = [{
    active: true,
  }, {
    active: false,
  }, {
    active: false,
  }, {
    active: false,
  }];

  public constructor(){};

  public handleClickItem(index : number){
    if(this.showDefault) this.showDefault = false;
    
    for(let i : number = 0; i < this.items.length; i++){
      const item : Item = this.items[i];
      if(i === index) item.active = true;
      else item.active = false;
    };
  };

};
