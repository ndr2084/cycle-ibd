import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { HeroPage } from "./pages/hero-page/hero-page";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, HeroPage],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('cycle-ibd');
}
