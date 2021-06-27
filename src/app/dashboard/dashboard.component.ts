import { Component, OnInit } from '@angular/core';
import { HeroState } from '../hero.state';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  topHeroes$ = this.heroState.topHeroes$;
  constructor(private heroState: HeroState) {}

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroState.getHeroesList();
  }
}
