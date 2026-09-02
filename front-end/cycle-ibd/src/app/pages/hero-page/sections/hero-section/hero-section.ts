import { Component, inject, signal } from '@angular/core';
import { Header } from '../../../../components/header/header';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MorphSVGPlugin } from 'gsap/all';
import { SplitText } from "gsap/SplitText";
import { Router} from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { SidePanelModal } from './side-panel-modal/side-panel-modal';
gsap.registerPlugin(ScrollTrigger,SplitText, MorphSVGPlugin);

@Component({
  selector: 'app-hero-section',
  imports: [Header],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.scss',
})
export class HeroSection {

  /*imports*/
  private router = inject(Router);
  showCards = signal(false);
  private dialog = inject(Dialog);
  ngAfterViewInit(){
    document.fonts.ready.then(() => {
      gsap.set("button", { opacity: 1 });

      const headlineSplit = SplitText.create("button", {
        type: "words",
        wordsClass: "word++",
        ignore: "sup"
      });

      gsap.from(headlineSplit.words, {
        y: -100,
        opacity: 0,
        rotation: "random(-80, 80)",
        stagger: 0.1,
        duration: 1,
        ease: "back"
      });
    });
  }




  protected getStarted(){
    this.showCards.update(bool => !bool);
    // showCards() gates the .path element behind an @if - it isn't in the
    // DOM yet on this tick, so wait a frame for Angular to render it before
    // querying for it.
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const path = document.querySelector(".path");
      const start = "M 0 100 V 50 Q 50 0 100 50 V 100 z";
      const end = "M 0 100 V 0 Q 50 0 100 0 V 100 z";

      gsap.timeline()
        .to(path, { morphSVG: start, ease: "power2.in" })
        .to(path, { morphSVG: end, ease: "power2.out" });
    }));
  }
  }
