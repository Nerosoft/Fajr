import { Injectable } from '@angular/core';
import {
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginComponent } from 'src/app/views/login/login.component';

@Injectable({
  providedIn: 'root',
})
export class SuccessGuard implements CanLoad {
  constructor(private route: Router) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!LoginComponent.USERLOGIN) {
      this.route.navigate(['/Login']);
    } else {
      return true;
    }
    return false;
  }
}
