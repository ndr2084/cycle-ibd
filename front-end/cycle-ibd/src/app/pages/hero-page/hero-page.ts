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
}
