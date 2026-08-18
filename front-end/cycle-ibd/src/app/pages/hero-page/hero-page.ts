import { Component } from '@angular/core';
import { Header } from "../../components/header/header";
import { HeroSection } from './sections/hero-section/hero-section';
import { AboutMe } from './sections/about-me/about-me';
import { WhatImDoing } from "./sections/what-im-doing/what-im-doing";
import { MyMission } from './sections/my-mission/my-mission';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(ScrollTrigger, SplitText);

@Component({
  selector: 'app-hero-page',
  imports: [Header, HeroSection, AboutMe, WhatImDoing, MyMission],
  templateUrl: './hero-page.html',
  styleUrl: './hero-page.scss',
})
export class HeroPage {
  ngAfterViewInit() {
    var panels = gsap.utils.toArray(".section");
    panels.pop();

    const triggers: ScrollTrigger[] = [];

    panels.forEach((panel: any, i) => {

      // Get the element holding the content inside the panel
      let innerpanel = panel.querySelector(".wrapper");

      // Get the Height of the content inside the panel
      let panelHeight = innerpanel.offsetHeight;
      console.log(panelHeight)

      // Get the window height
      let windowHeight = window.innerHeight;

      let difference = panelHeight - windowHeight;

      // ratio (between 0 and 1) representing the portion of the overall animation that's for the fake-scrolling. We know that the scale & fade should happen over the course of 1 windowHeight, so we can figure out the ratio based on how far we must fake-scroll
      let fakeScrollRatio = difference > 0 ? (difference / (difference + windowHeight)) : 0;

      // if we need to fake scroll (because the panel is taller than the window), add the appropriate amount of margin to the bottom so that the next element comes in at the proper time.
      if (fakeScrollRatio) {
        panel.style.marginBottom = panelHeight * fakeScrollRatio + "px";
      }

      let tl = gsap.timeline({
        scrollTrigger:{
          trigger: panel,
          start: "bottom bottom",
          end: () => fakeScrollRatio ? `+=${innerpanel.offsetHeight}` : "bottom top",

          scrub: true
        }
      });

      triggers.push(tl.scrollTrigger as ScrollTrigger);

      // fake scroll. We use 1 because that's what the rest of the timeline consists of (0.9 scale + 0.1 fade)
      if (fakeScrollRatio) {
        tl.to(innerpanel, {yPercent:-100, y: window.innerHeight, duration: 1 / (1 - fakeScrollRatio) - 1, ease: "none"});
      }
      tl.fromTo(panel, {scale:1.0, opacity:1}, {scale: 0.9, opacity: 1, duration: 0.1})
        .to(panel, {scale: 1.00, opacity:0.0, duration: 0.1});
    });

    // Snap to the resting point of each panel (the start of its pin) plus the
    // final panel's top, once all pin/scrub ScrollTriggers above have run.
  }
}
