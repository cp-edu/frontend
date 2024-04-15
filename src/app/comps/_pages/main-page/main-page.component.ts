import {AfterViewInit, Component, ViewChild, ViewChildren} from '@angular/core';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent implements AfterViewInit {
  @ViewChildren('floating_text') public floating_texts: any;
  @ViewChild ('learn_more_container') public learn_more_container: any;

  ngAfterViewInit() {
    this.learn_more_container = this.learn_more_container.nativeElement;
    this.floating_texts = this.floating_texts._results;
    for (let i = 0; i < this.floating_texts.length; i++) this.floating_texts[i]=this.floating_texts[i].nativeElement;

    this.MoveFloatingText();
  }

  MoveFloatingText() {
    const scroll = document.getElementById('main-scroll')!;
    for (const e of this.floating_texts) {
      e.style.right = `calc(var(--floating-text-right) - ${(e.offsetWidth - e.offsetHeight) / 2}px)`;
    }

    scroll.addEventListener('scroll', ()=>{
      for (const e of this.floating_texts) {
        console.log(scroll.scrollTop);
        e.style.transform = `rotate(90deg) translateX(-${scroll.scrollTop/10}px)`;
        console.log(e.style.transform);
      }
    })
  }

  ScrollToView(e: any) {
    e.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
