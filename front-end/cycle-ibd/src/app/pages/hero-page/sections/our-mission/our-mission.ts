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
  private cards!:  | null;

  ngAfterViewInit() {

    const sections = gsap.utils.toArray(".panel");
    const offsetLeft = -((sections.length -1) / (sections.length)) * 100

    const tl =gsap.timeline();
    tl.from(".container", {xPercent: ( offsetLeft)})



    console.log(sections.length);

    this.container = document.querySelector(".container");

    gsap.to(sections, {
      ease: "none",
      xPercent: 100 * (sections.length - 1),
      scrollTrigger: {
        trigger: this.container,
        pin: true,
        start: "top top",
        scrub: 1,
        end: () => "+=" + this.container!.offsetWidth,
        markers: true
      }
    })
  }
}
