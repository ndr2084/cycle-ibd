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

    ngAfterViewInit() {
      ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 3,
        effects: true,
      });

      let innerPanels = gsap.utils.toArray(".innerpanel");
      let n = innerPanels.length;
      let horizontalScroll = -((n - 1) / n) * 100;

      gsap.to(".container", {
        ease: "none",
        xPercent: horizontalScroll,
        scrollTrigger: {
          trigger: ".container",
          pin: true,
          scrub: true,
          start: "top top",
          end: () => "+=" + document.querySelector<HTMLElement>(".container")?.offsetWidth,
        }
      })


      gsap.fromTo(".path-1", { drawSVG: "100% 100%" }, { drawSVG: "100% 0%", duration: 1})

      let pipeEndPosition = gsap.fromTo(".path-2", { drawSVG: "0% 0%"}, { drawSVG: "0%, 100%",
        scrollTrigger:{
          markers: true,
          trigger: ".innerpanel-1",
          start: "top bottom",
          end: () => "+=" + (document.querySelector<HTMLElement>(".container")!.offsetWidth / 2) ,
          scrub: true,
        }
      });

      let pipeEndPosition2 = gsap.fromTo(".path-3", { drawSVG: "0% 0%"}, { drawSVG: "0%, 100%",
        scrollTrigger:{
          trigger: ".innerpanel-1",
          start: () => pipeEndPosition.scrollTrigger!.end,
          end: () => "+=" + document.querySelector<HTMLElement>(".container")!.offsetWidth / 1.25,
          scrub: true,
        }
      });

        gsap.fromTo(".path-4", { drawSVG: "0% 0%"}, { drawSVG: "0%, 100%",
          scrollTrigger:{
            trigger: ".outerpanel",
            start: () => pipeEndPosition2.scrollTrigger!.end,
            end: "bottom bottom",
            scrub: true,
          }
      });

    }
}
