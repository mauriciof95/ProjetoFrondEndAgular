import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html'
})
export class NavMenuComponent{
  public isCollapsed: boolean;

  constructor() {
    this.isCollapsed = true;
   }
}
