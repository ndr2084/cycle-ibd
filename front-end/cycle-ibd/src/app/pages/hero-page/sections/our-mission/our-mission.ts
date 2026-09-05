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

  ngAfterViewInit() {
    this.container = document.querySelector(".container")
    let sections = gsap.utils.toArray(".panel");
    this.container!.style.width = `${sections.length * 100}%`;
    let shiftContainerLeft = -((sections.length -1) / (sections.length)) * 99;
    console.log(shiftContainerLeft);

    gsap.from(".container",

      {immediateRender: true,
        xPercent: shiftContainerLeft});

    gsap.to(".road-1", {
      "--reveal": "100%",
      ease: "none",
      scrollTrigger: {
        trigger: ".firstContainer",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    gsap.to(sections, {
      xPercent: 100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: ".container",
        pin: true,
        scrub: 1,
        end: () => "+=" + this.container!.offsetWidth
      }
    });
  }
}
