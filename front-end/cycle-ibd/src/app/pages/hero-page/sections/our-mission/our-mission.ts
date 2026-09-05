import { Component } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
@Component({
  selector: 'app-my-mission',
  imports: [],
  templateUrl: './our-mission.html',
  styleUrl: './our-mission.scss',
})
export class OurMission {

  private container!: HTMLElement | null;
  private cards!: | null;

  ngAfterViewInit() {
    let sections = gsap.utils.toArray(".panel");
    gsap.from(".container",
      {xPercent: -((sections.length -1) / (sections.length)) * 100});


    gsap.to(sections, {
      xPercent: 100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: ".container",
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: () => "+=" + document.querySelector<HTMLElement>(".container")!.offsetWidth
      }
    });
  }
}
