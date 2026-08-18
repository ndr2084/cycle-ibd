import { Component } from '@angular/core';
import { Header } from '../../../../components/header/header';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(ScrollTrigger,SplitText);

@Component({
  selector: 'app-hero-section',
  imports: [Header],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.scss',
})
export class HeroSection {
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
}
