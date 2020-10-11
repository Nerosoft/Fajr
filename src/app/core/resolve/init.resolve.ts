import { AngularFireList } from '@angular/fire/database';
import { CategorysServes } from '../../views/categorys/CategorysServes';
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class HeroResolver implements Resolve<any> {
  constructor(public categorysServes: CategorysServes) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return 'fu';
  }
}
