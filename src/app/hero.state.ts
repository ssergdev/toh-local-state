import { Injectable } from '@angular/core';
import { insert, remove, RxState, update } from '@rx-angular/state';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

import { autoConnect } from './core/local.state';
import { HeroStateInterface } from './hero-state.interface';
import { HeroService } from './hero.service';
import { HeroInterface } from './hero.interface';

@Injectable()
export class HeroState extends RxState<HeroStateInterface> {
  heroes$ = this.select('heroes');
  selectedHero$ = this.select('hero');
  topHeroes$ = this.heroes$.pipe(map((heroes) => heroes?.slice(1, 5)));

  constructor(private heroService: HeroService) {
    super();
  }

  getHeroes = autoConnect(this, () => {
    return this.heroService.getHeroes().pipe(map((heroes) => ({ heroes })));
  });

  getHero = autoConnect(this, (id: number) => {
    const heroes = this.get('heroes');
    const hero = heroes?.find((h) => h.id === id);
    return hero ? of({ hero }) : this.heroService.getHero(id).pipe(map((h) => ({ hero: h })));
  });

  addHero = autoConnect(this, (hero: HeroInterface) => {
    return this.heroService
      .addHero(hero)
      .pipe(map(() => ({ heroes: insert(this.get('heroes'), hero) })));
  });

  deleteHero = autoConnect(this, (hero: HeroInterface) => {
    return this.heroService
      .deleteHero(hero)
      .pipe(map(() => ({ heroes: remove(this.get('heroes'), hero) })));
  });

  updateHero = autoConnect(this, (hero: HeroInterface) => {
    return this.heroService
      .updateHero(hero)
      .pipe(map(() => ({ heroes: update(this.get('heroes'), hero) })));
  });
}
