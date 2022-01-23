import { Component, OnInit } from '@angular/core';

import { HeroInterface } from '../hero.interface';
import { HeroState } from '../hero.state';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  heroes$ = this.heroState.heroes$;
  constructor(private heroState: HeroState) {}

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroState.getHeroes();
  }

  add(name: string): void {
    this.heroState.addHero({ name } as HeroInterface);
  }

  delete(hero: HeroInterface): void {
    this.heroState.deleteHero(hero);
  }
}
