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



  clickCard() {
    if (this.isAnimating) return;
    this.slider = document.querySelector('.slider') as HTMLElement;
    const cards = Array.from(this.slider.querySelectorAll('.card')) as HTMLElement[];
    const frontCard = cards[0];
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

  }
  private moveFrontCardToBack(frontCard: HTMLElement) {
    if (this.slider && frontCard) {
      console.log("child element exists")
      this.slider.insertBefore(this.slider.firstChild!, null);
    }
  }

  /*helper functions start*/

  private nextAnimation(delay: number) {
    setTimeout(() => {
      this.nextScene.update(() => this.scene[1]);
    }, delay);
  }

  private delaySum(animationLength: number[][]){
    var sum: number = 0;
    var MILLISECONDS_TO_SECONDS: number = 1000;
    animationLength.forEach(element => {
      sum += element[0] - element[1]
    });
    return sum * MILLISECONDS_TO_SECONDS;
  }

  /*helper functions end*/
}
