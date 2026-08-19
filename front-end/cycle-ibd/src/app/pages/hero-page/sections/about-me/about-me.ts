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
    const lastItem = this.slider?.querySelector('.card:nth-child(3)');

    if (this.slider && lastItem) {
      console.log("child element exists")
      this.slider.insertBefore(lastItem, this.slider.firstChild);
    }
  }

  clickCard() {
    if (this.isAnimating) return;

    const cards = Array.from(this.slider.querySelectorAll('.card')) as HTMLElement[];
    const frontCard = cards[cards.length - 1];
    const otherCards = cards.filter((card) => card !== frontCard);

    this.isAnimating = true;

    gsap.timeline({ onComplete: () => (this.isAnimating = false) })
      .to(frontCard, {
        y: -50,
        opacity: 0.1,
        duration: 0.35,
        ease: 'power1.inOut',
      })
      .call(() => {
        const state = Flip.getState(otherCards);

        this.moveCard();

        Flip.from(state, {
          targets: otherCards,
          duration: 0.3,
          ease: 'power2.in',
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
