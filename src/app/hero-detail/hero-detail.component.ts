import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroState } from '../hero.state';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
  hero$ = this.heroState.selectedHero$;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private heroState: HeroState
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.heroState.getHero(id);
  }

  goBack(): void {
    this.location.back();
  }

  save(hero: Hero): void {
    this.heroState.updateHero(hero);
  }
}
