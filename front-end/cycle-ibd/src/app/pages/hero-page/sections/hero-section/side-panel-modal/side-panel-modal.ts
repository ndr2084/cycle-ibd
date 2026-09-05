import { DialogRef } from '@angular/cdk/dialog';
import { Component, ElementRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { gsap } from "gsap"
import { MorphSVGPlugin } from 'gsap/all';
gsap.registerPlugin(MorphSVGPlugin);

@Component({
  selector: 'app-side-panel-modal',
  imports: [],
  templateUrl: './side-panel-modal.html',
  styleUrl: './side-panel-modal.scss',
})
export class SidePanelModal {

  router = inject(Router);

  constructor(private el: ElementRef<HTMLElement>) { }
  tl = gsap.timeline();

  private dialogRef = inject(DialogRef,
    {
      optional: true,
    });
  protected closeModal() {
    this.tl.reversed(!this.tl.reversed());
    setTimeout(() => {
      this.dialogRef?.close();
    }, 500);
  }
  ngAfterViewInit() {
    const path = document.querySelector(".path");
    const start = "M 0 100 V 50 Q 50 0 100 50 V 100 z";
    const end = "M 0 100 V 0 Q 50 0 100 0 V 100 z";

    this.tl.to(path, { morphSVG: start, ease: "power2.in" });
    this.tl.to(path, { morphSVG: end, ease: "power2.out" });
  }

  ourMission() {
    this.closeModal();
    this.router.navigateByUrl("our-mission");
  }
}
