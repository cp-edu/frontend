import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TopBarComponent} from "./comps/top-bar/top-bar.component";
import {SlideMenuComponent} from "./comps/_models/slide-menu/slide-menu.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopBarComponent, SlideMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cp-edu';
}
