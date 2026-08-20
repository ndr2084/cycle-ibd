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

  ngAfterViewInit() {
    this.slider = document.querySelector('.slider') as HTMLElement;
  }

  private isAnimating = false;

  private moveCard() {
    const lastItem = this.slider?.querySelector('.card:nth-child(1)');

    if (this.slider && lastItem) {
      console.log("child element exists")
      this.slider.insertBefore(this.slider.firstChild!, null);
    }
  }

  clickCard() {
    if (this.isAnimating) return;

    const cards = Array.from(this.slider.querySelectorAll('.card')) as HTMLElement[];
    const backCard = cards[cards.length -1];
    const frontCard = cards[0];
    const otherCards = cards.filter((card) => card !== frontCard);

    this.isAnimating = true;

    gsap.timeline({ onComplete: () => (this.isAnimating = false) })
      .to(frontCard, {
        y: -40,
        x: 70,
        opacity: 0.95,
        duration: 0.22,
        ease: 'power1.inOut',
      })
      .call(() => {
        const state = Flip.getState(otherCards);

        this.moveCard();

        Flip.from(state, {
          targets: otherCards,
          duration: 0.25,
          opacity: 1.0,
          ease: 'power2.in',
          absolute: true,
        });

        gsap.set(frontCard, {y:-80, x: 0});
      })
      .to(frontCard, {

        y:0,
        opacity: 1.0,
        duration: 0.18,
        ease: 'power1.out',
      });

    gsap.to("img", {
      x: 500, duration: 2
    });
  }
}
