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
    this.slider = document.querySelector('.inner-wrapper') as HTMLElement;
  }

  private isAnimating = false;

  private moveCard() {
    const lastItem = this.slider?.querySelector('section:last-child');

    if (this.slider && lastItem) {
      this.slider.insertBefore(lastItem, this.slider.firstChild);
    }
  }

  clickCard() {
    if (this.isAnimating) return;

    const cards = Array.from(this.slider.querySelectorAll('section')) as HTMLElement[];
    const frontCard = cards[cards.length - 1];
    const otherCards = cards.filter((card) => card !== frontCard);

    this.isAnimating = true;

    gsap.timeline({ onComplete: () => (this.isAnimating = false) })
      .to(frontCard, {
        y: -40,
        opacity: 0,
        duration: 0.4,
        ease: 'power1.in',
      })
      .call(() => {
        const state = Flip.getState(otherCards);

        this.moveCard();

        Flip.from(state, {
          targets: otherCards,
          duration: 0.5,
          ease: 'power2.inOut',
          absolute: true,
        });

        gsap.set(frontCard, { y: 40 });
      })
      .to(frontCard, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: 'power1.out',
      });
  }
}
