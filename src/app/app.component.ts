import { HeroService } from 'src/app/hero/hero.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public get heroService(): HeroService {
    return this._heroService;
  }

  constructor(private _heroService: HeroService) {}
  title = 'TypeScript Type';
}
