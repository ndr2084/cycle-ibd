import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Header } from '../../../../components/header/header';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MorphSVGPlugin } from 'gsap/all';
import { SplitText } from "gsap/SplitText";
import { Router} from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { SidePanelModal } from './side-panel-modal/side-panel-modal';
gsap.registerPlugin(ScrollTrigger,SplitText, MorphSVGPlugin);

@Component({
  selector: 'app-hero-section',
  imports: [Header, SidePanelModal],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.scss',
})
export class HeroSection {

  /*imports*/
  dialog = inject(Dialog);
  private router = inject(Router);
  htmlCards = signal(false);
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




  protected getStarted(){

    this.dialog.open(SidePanelModal, {
      disableClose: true,
      height: '100%',
      width: '100%',
    } );
  }
}
