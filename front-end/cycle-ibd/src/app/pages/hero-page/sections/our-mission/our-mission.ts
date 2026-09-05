import { Component } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, DrawSVGPlugin);
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

    // Measured now, before any scrolling/pinning has happened, so it's a
    // stable pixel anchor for the road-2/road-3 math below. GSAP's
    // "top+=N top" offset syntax doesn't resolve reliably against a trigger
    // that's also pinned by another ScrollTrigger, so plain scroll-pixel
    // math is used instead of position strings for those two.
    const pinStart = this.container!.getBoundingClientRect().top + window.scrollY;

    gsap.from(".container",

      {immediateRender: true,
        xPercent: shiftContainerLeft});

    gsap.set(".road-1 path, .road-2 path, .road-3 path, .road-4 path", { drawSVG: "0%" });

    // road-1 is in the hero, already on screen at load - draw it immediately
    // rather than gating it behind a scroll trigger.
    gsap.to(".road-1 path", {
      drawSVG: "100%",
      duration: 1.5,
      ease: "power2.out",
    });

    gsap.to(sections, {
      xPercent: 100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: ".container",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        end: () => "+=" + this.container!.offsetWidth
      }
    });

    // Every panel gets the same xPercent value every frame, so with equal-width
    // panels they hand off continuously across the whole pin - there's no
    // sub-range where only one panel is "the visible one" to anchor a
    // containerAnimation position string to. Split the pin's real scroll
    // distance evenly between the two roads instead.
    gsap.to(".road-2 path", {
      drawSVG: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: ".container",
        start: () => pinStart,
        end: () => pinStart + this.container!.offsetWidth / sections.length,
        scrub: 1,
      },
    });

    gsap.to(".road-3 path", {
      drawSVG: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: ".container",
        start: () => pinStart + this.container!.offsetWidth / sections.length,
        end: () => pinStart + this.container!.offsetWidth,
        scrub: 1,
      },
    });

    gsap.to(".road-4 path", {
      drawSVG: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: ".lastContainer",
        start: "top top",
        // .lastContainer is the final section on the page, so its bottom can
        // never scroll past the viewport's top - "bottom bottom" (reached at
        // max scroll) is the correct, always-reachable end here.
        end: "bottom bottom",
        scrub: 1,
      },
    });
  }
}
