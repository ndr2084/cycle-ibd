import { Component } from '@angular/core';
import { Header } from "../../components/header/header";
import { HeroSection } from './sections/hero-section/hero-section';
import { AboutMe } from './sections/about-me/about-me';
import { WhatImDoing } from "./sections/what-im-doing/what-im-doing";
import { MyMission } from './sections/my-mission/my-mission';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Observer } from "gsap/Observer";
gsap.registerPlugin(Observer);

@Component({
  selector: 'app-hero-page',
  imports: [Header, HeroSection, AboutMe, WhatImDoing, MyMission],
  templateUrl: './hero-page.html',
  styleUrl: './hero-page.scss',
})
export class HeroPage {
  ngAfterViewInit() {

    // These selectors reach into child components' templates (e.g. .outer/.inner
    // inside app-what-im-doing) — see /notes/ViewEncapsulation.md for why that works.
    let sections = document.querySelectorAll(".section"),
      outerWrappers = gsap.utils.toArray(".outer"),
      innerWrappers = gsap.utils.toArray(".inner"),
      currentIndex = -1,
      wrap = gsap.utils.wrap(0, sections.length),
      animating: boolean

    gsap.set(outerWrappers, { yPercent: 100 });
    gsap.set(innerWrappers, { yPercent: -100 });

    function gotoSection(index: any, direction: any) {
      index = wrap(index); // make sure it's valid
      animating = true;
      let fromTop = direction === -1,
        dFactor = fromTop ? -1 : 1,
        tl = gsap.timeline({
          defaults: { duration: 0.5, ease: "power1.inOut" },
          onComplete: () => animating = false
        });
      if (currentIndex >= 0) {
        // The first time this function runs, current is -1
        gsap.set(sections[currentIndex], { zIndex: 0 });
      }
      gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });
      tl.fromTo([outerWrappers[index], innerWrappers[index]], {
        yPercent: i => i ? -100 * dFactor : 100 * dFactor
      }, {
        yPercent: 0
      }, 0)



      if (currentIndex >= 0) {
        // Hide the outgoing section once it's fully covered. Without this it stays
        // visibility:visible forever, and once 3+ sections have been visited, ties at
        // zIndex:0 resolve by DOM order instead of recency — so the wrong old section
        // can flash through during a later transition.
        tl.set(sections[currentIndex], { autoAlpha: 0 });
      }

      currentIndex = index;
    }

    Observer.create({
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      onDown: () => !animating && gotoSection(currentIndex - 1, -1),
      onUp: () => !animating && gotoSection(currentIndex + 1, 1),
      tolerance: 1,
      preventDefault: true
    });

    gotoSection(0, 1);
  }
}
