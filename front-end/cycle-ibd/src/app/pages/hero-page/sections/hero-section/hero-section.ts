import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Header } from '../../../../components/header/header';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MorphSVGPlugin } from 'gsap/all';
import { SplitText } from "gsap/SplitText";
import { Router } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { SidePanelModal } from './side-panel-modal/side-panel-modal';
gsap.registerPlugin(ScrollTrigger, SplitText, MorphSVGPlugin);

@Component({
  selector: 'app-hero-section',
  imports: [Header, SidePanelModal],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.scss',
})
export class HeroSection {

  /*imports*/
  dialog = inject(Dialog);
  private router = inject(Router);
  htmlCards = signal(false);

  private parallaxTweens: gsap.core.Tween[] = [];
  private readonly parallaxSelectors = [
    '.scroller-road-lines',
    '.scroller-near-trees',
    '.scroller-far-trees',
    '.scroller-mountains',
  ];

  private slider!: HTMLElement;
  private isAnimating = false;

  ngAfterViewInit() {
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
    const layers: [string, number][] = [
      [this.parallaxSelectors[0], 2],
      [this.parallaxSelectors[1], 5],
      [this.parallaxSelectors[2], 20],
      [this.parallaxSelectors[3], 120],
    ];

    this.parallaxTweens = layers
      .map(([selector, duration]) => gsap
        .to(selector, {
          x: -700,
          duration,
          ease: 'none',
          repeat: -1,
        })
      );
  }


  protected getStarted() {

    this.dialog.open(SidePanelModal, {
      disableClose: true,
      height: '100%',
      width: '100%',
    });
    /*
    if (this.isAnimating) return;
    this.slider = document.querySelector('.slider') as HTMLElement;
    const cyclist = document.querySelector(".bike") as HTMLElement;
    this.isAnimating = true;

    const tl = gsap.timeline({ onComplete: () => (this.isAnimating = false) });
    const cylceCel = document.querySelector(".cycle-cel") as HTMLElement;
    const road = cylceCel.querySelector('#road') as HTMLElement;
    const duration_a = [1, 0],
      duration_b = [1, 1],
      duration_c = [1, 1],
      duration_d = [1, 0.5],
      duration_e = [1, 0.5];
    const animation_length = [duration_a, duration_b, duration_c, duration_d, duration_e];

    // Whip pan: ramp each parallax layer's playback speed and stretch it
    // horizontally over 1s to sell the illusion of a fast forward acceleration.
    tl.to(this.parallaxTweens, {
      timeScale: 12,
      duration: duration_a[0],
      ease: 'power2.in',
    }, duration_a[1])
      .to(this.parallaxSelectors, {
        scaleX: 1.6,
        transformOrigin: 'right center',
        duration: duration_b[0],
        opacity: 0,

        ease: 'power2.in',
      }, duration_b[1])

      .to(road, {
        opacity: 0,
        duration: duration_c[0],
      }, duration_c[1])

      .to(this.slider, {
        opacity: 0,
        duration: duration_d[0],
        y: -20
      }, duration_d[1])

      .to(cyclist, {
        x: 1250,
        duration: duration_e[0],
        opacity: 0,
      }, duration_e[1]);

    this.nextAnimation(this.delaySum(animation_length));
  }
  private moveFrontCardToBack(frontCard: HTMLElement) {
    if (this.slider && frontCard) {
      console.log("child element exists")
      this.slider.insertBefore(this.slider.firstChild!, null);
    }
  }

  private nextAnimation(delay: number) {
    setTimeout(() => {}, delay);
  }

  private delaySum(animationLength: number[][]) {
    var sum: number = 0;
    var MILLISECONDS_TO_SECONDS: number = 1000;
    animationLength.forEach(element => {
      sum += element[0] - element[1]
    });
    return sum * MILLISECONDS_TO_SECONDS;
  }

  */
  }
}
