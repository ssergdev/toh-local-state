import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroState } from '../hero.state';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent {
  hero$ = this.heroState.selectedHero$;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private heroState: HeroState
  ) {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.heroState.getHero(id);
  }

  goBack(): void {
    this.location.back();
  }

  save(hero: Hero): void {
    this.heroState.updateHero(hero);
    this.location.back();
  }
}
