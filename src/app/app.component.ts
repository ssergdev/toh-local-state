import { Component } from '@angular/core';
import { HeroState } from './hero.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HeroState],
})
export class AppComponent {
  title = 'Tour of Heroes';
}
