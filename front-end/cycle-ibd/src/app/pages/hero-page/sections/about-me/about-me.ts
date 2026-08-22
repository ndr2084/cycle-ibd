import { Component, signal } from '@angular/core';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";
import { last } from 'rxjs';
gsap.registerPlugin(ScrollTrigger, SplitText, Flip);

@Component({
  selector: 'app-about-me',
  imports: [],
  templateUrl: './about-me.html',
  styleUrl: './about-me.scss',
})
export class AboutMe {

  scene = ['about-us', 'getting-started'];
  nextScene = signal(this.scene[0]);
  private slider!: HTMLElement;
  private isAnimating = false;
  private parallaxTweens: gsap.core.Tween[] = [];
  private readonly parallaxSelectors = [
    '.scroller-road-lines',
    '.scroller-near-trees',
    '.scroller-far-trees',
    '.scroller-mountains',
  ];



  ngAfterViewInit() {
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

  ngOnDestroy() {
    this.parallaxTweens.forEach((tween) => tween.kill());
  }

  clickCard() {
    this.slider = document.querySelector('.slider') as HTMLElement;
    if (this.isAnimating) return;

    const cards = Array.from(this.slider.querySelectorAll('.card')) as HTMLElement[];
    const frontCard = cards[0];
    const cylceCel = document.querySelector(".cycle-cel") as HTMLElement;
    const road = cylceCel.querySelector('#road') as HTMLElement;
    const cyclist = document.querySelector(".bike") as HTMLElement;
    const otherCards = cards.filter((card) => card !== frontCard);
    const isMissionCard = frontCard.classList.contains('card-three');

    this.isAnimating = true;

    const tl = gsap.timeline({ onComplete: () => (this.isAnimating = false) });

    tl
      .to(frontCard, {
        y: -40,
        x: 70,
        opacity: 0.95,
        duration: 0.22,
        ease: 'power1.inOut',
      }, 0)
      .call(() => {
        const state = Flip.getState(otherCards);

        this.moveFrontCardToBack(frontCard);

        Flip.from(state, {
          targets: otherCards,
          duration: 0.25,
          opacity: 1.0,
          ease: 'power2.in',
          absolute: true,
        });

        gsap.set(frontCard, { y: -80, x: 0 });
      })
      .to(frontCard, {

        y: 0,
        opacity: 1.0,
        duration: 0.18,
        ease: 'power1.out',
      });

    if (isMissionCard) {
      const duration_a = [1, 0],
       duration_b = [1,1],
        duration_c = [1, 1],
         duration_d = [1, 0.5],
          duration_e = [1,0.5];
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
          duration:  duration_b[0],
          opacity: 0,

          ease: 'power2.in',
        },  duration_b[1])

        .to(road, {
          opacity: 0,
          duration:  duration_c[0],
        },  duration_c[1])

        .to(this.slider, {
          opacity: 0,
          duration:  duration_d[0],
          y: -20
        },  duration_d[1])

        .to(cyclist, {
          x: 1250,
          duration:  duration_e[0],
          opacity: 0,
        },  duration_e[1]);

        this.nextAnimation(this.totalDelay(animation_length))

      /*
      *we will need to reintegrate these once we design for the use browsing backwards
      .set(this.parallaxTweens, { timeScale: 1 })
      .set(this.parallaxSelectors, { scaleX: 1 });
      */
    }
  }
  private moveFrontCardToBack(frontCard: HTMLElement) {
    if (this.slider && frontCard) {
      console.log("child element exists")
      this.slider.insertBefore(this.slider.firstChild!, null);
    }
  }

  private nextAnimation(delay: number) {
      setTimeout(() => {
        this.nextScene.update(() => this.scene[1]);
      }, delay);
    }

  totalDelay(animationLength: number[][]){
    var cel_length : number = 0;
    var delay_length : number = 0;
    var total : number[]
     = animationLength.map(([a, b]) => {
      cel_length += a
      delay_length += b;
      console.log(a);
      console.log(b);
      total[0] +=  (a - b);
      console.log(total[0]);
      return total[0];
    },)
    return Promise.all(total).then(() =>{
      
    })
  }
  }
