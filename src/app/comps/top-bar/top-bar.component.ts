import {AfterViewInit, Component, ViewChild, ViewChildren} from '@angular/core';
import {RoutingService} from "../../services/routing.service";
import {NgForOf} from "@angular/common";
import {SlideMenuComponent} from "../_models/slide-menu/slide-menu.component";

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent implements AfterViewInit {
  public routes = this.router.TopBarRoutes;
  @ViewChild('main') private main: any;
  @ViewChild('nav') private nav: any;
  @ViewChildren('close_line') private close_lines: any;
  @ViewChild('open_line') private open_line: any;
  private menu_status: boolean = false;
  private opening_slide_menu_in_progress: boolean = false;

  constructor(
    public router: RoutingService,
  ) {
  }

  ngAfterViewInit() {
    this.main = this.main.nativeElement;
    this.nav = this.nav.nativeElement;
    this.open_line = this.open_line.nativeElement;
    this.close_lines = this.close_lines._results;
    for (let i = 0; i < this.close_lines.length; i++) this.close_lines[i] = this.close_lines[i].nativeElement;

    const roller = document.getElementById('main-scroll')!;
    roller.addEventListener('scroll', ()=>{
      if (roller.scrollTop === 0) {
        document.documentElement.style.setProperty('--top-bar-height', 'var(--top-bar-height_opened)');
        this.SlideNavIn();
      } else {
        document.documentElement.style.setProperty('--top-bar-height', 'var(--top-bar-height_closed)');
        this.SlideNavOut();
      }
    });
  }

  SlideNavOut() {
    this.nav.style.transform = 'translateX(200%)';
    setTimeout(()=>{
      this.nav.style.display = 'flex';
    }, 300);
  }


  SlideNavIn() {
    this.nav.style.display = 'flex';
    setTimeout(()=>{
      this.nav.style.transform = 'translateX(0)';
    });
  }

  InteractSlideMenu() {
    if (this.opening_slide_menu_in_progress) return;
    this.opening_slide_menu_in_progress = true;
    if (this.menu_status) this.CloseSlideMenu();
    else this.OpenSlideMenu()
    this.menu_status = !this.menu_status;
  }

  OpenSlideMenu() {
    SlideMenuComponent.Open();
    this.SlideNavOut();
    document.documentElement.style.setProperty('--top-bar-background', 'var(--top-bar-background-opened)');
    for (let line of this.close_lines) line.style.width = '0';
    this.open_line.style.width = 'var(--open-line-width)';

    setTimeout(() => {
      this.opening_slide_menu_in_progress = false;
    }, SlideMenuComponent.OpenTime);
  }

  CloseSlideMenu() {
    SlideMenuComponent.Close();
    this.SlideNavIn();
    for (let line of this.close_lines) line.style.width = 'var(--open-line-width)';
    this.open_line.style.width = 'var(--close-line-width)';
    this.main.style.background = 'var(--top-bar-background)';
    setTimeout(()=>{
      document.documentElement.style.setProperty('--top-bar-background', 'var(--top-bar-background-closed)');
    }, 600);

    setTimeout(() => {
      this.opening_slide_menu_in_progress = false;
    }, SlideMenuComponent.CloseTime);
  }

}
