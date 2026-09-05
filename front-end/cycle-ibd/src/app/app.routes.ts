import { Routes } from '@angular/router';
import { HeroPage } from './pages/hero-page/hero-page'
import { OurMission } from './pages/hero-page/sections/our-mission/our-mission';

export const routes: Routes = [
  {
    path: '',
    component: HeroPage
  },

  {
    path: 'our-mission',
    component: OurMission
  },
];
