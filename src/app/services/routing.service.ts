import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {TobBarRouteModel} from "../models/tob-bar-route.model";
import {SlideMenuComponent} from "../comps/_models/slide-menu/slide-menu.component";

@Injectable({
  providedIn: 'root'
})
export class RoutingService {
  public readonly TopBarRoutes: TobBarRouteModel[] = [
    { name: 'home', url: '' },
    { name: 'call for problems', url: 'problems' },
    { name: 'algorithms', url: 'algorithms' },
  ]

  constructor(
    private router: Router,
  ) { }

  navigate(link: string) {
    if (SlideMenuComponent.IsOpened()) {
      SlideMenuComponent.Close();
      setTimeout(() => {
        this.router.navigate([link]).then();
      }, SlideMenuComponent.CloseTime)
    } else {
      this.router.navigate([link]).then();
    }
  }

  getRoute() {
    return this.router.url.substring(1,this.router.url.length);
  }
}
