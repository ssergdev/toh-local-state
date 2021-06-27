import { Injectable } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { HeroStateModel } from './hero-state-model';
import { HeroService } from './hero.service';
import { Hero } from './hero';

@Injectable()
export class HeroState extends RxState<HeroStateModel> {
  heroes$ = this.select('heroes');
  selectedHero$ = this.select('selectedHero');
  topHeroes$ = this.heroes$.pipe(map((heroes) => heroes?.slice(1, 5)));

  private getHeroesList$ = new Subject();
  private getHero$ = new Subject<number>();
  private addHero$ = new Subject<Hero>();
  private deleteHero$ = new Subject<Hero>();
  private updateHero$ = new Subject<Hero>();

  constructor(private heroService: HeroService) {
    super();

    this.connect('heroes', this.getHeroesList$.pipe(switchMap(() => this.heroService.getHeroes())));

    this.connect(
      'selectedHero',
      this.getHero$.pipe(switchMap((id) => this.heroService.getHero(id)))
    );

    this.connect(
      'heroes',
      this.addHero$.pipe(switchMap((hero) => this.heroService.addHero(hero))),
      ({ heroes }, hero) => [...(heroes || []), hero]
    );

    this.connect(
      'heroes',
      this.deleteHero$.pipe(switchMap((hero) => this.heroService.deleteHero(hero))),
      ({ heroes }, hero) => heroes?.filter((h) => h !== hero)
    );

    this.connect(
      'heroes',
      this.updateHero$.pipe(switchMap((hero) => this.heroService.updateHero(hero))),
      ({ heroes }, hero) => heroes?.map((h) => (h.id === hero.id ? hero : h))
    );
  }

  getHeroesList(): void {
    this.getHeroesList$.next();
  }

  getHero(id: number): void {
    const heroes = this.get('heroes');
    const hero = heroes?.find((h) => h.id === id);
    if (hero) {
      this.set({ selectedHero: hero });
      return;
    }
    this.getHero$.next(id);
  }

  addHero(hero: Hero): void {
    this.addHero$.next(hero);
  }

  deleteHero(hero: Hero): void {
    this.deleteHero$.next(hero);
  }

  updateHero(hero: Hero): void {
    this.updateHero$.next(hero);
  }
}
