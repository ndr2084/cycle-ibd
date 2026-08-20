import { Component } from '@angular/core';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";
gsap.registerPlugin(ScrollTrigger, SplitText, Flip);

@Component({
  selector: 'app-about-me',
  imports: [],
  templateUrl: './about-me.html',
  styleUrl: './about-me.scss',
})
export class AboutMe {

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
        // Whip pan: ramp each parallax layer's playback speed and stretch it
        // horizontally over 1s to sell the illusion of a fast forward acceleration.
        tl.to(this.parallaxTweens, {
          timeScale: 12,
          duration: 1,
          ease: 'power2.in',
        }, 0)
          .to(this.parallaxSelectors, {
            scaleX: 1.6,
            transformOrigin: 'right center',
            duration: 1,
            opacity: 0,

            ease: 'power2.in',
          }, 1)

          .to(road,{
            opacity: 0,
            duration: 1,
          }, 1)

          .to(this.slider,{
            opacity: 0,
            duration: 1,
            y: -20
          }, 0.5)

          .to(cyclist,{
            x: 1250,
            duration: 2,
            opacity: 0,
          }, 0.75);


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


}
