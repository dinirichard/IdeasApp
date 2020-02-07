import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/app-store.module';
import { uuid } from '@app/utilities/uuid';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UuidGuard implements CanActivate {
  constructor(private store: Store<AppState>) { }

  canActivate(
    // next: ActivatedRouteSnapshot,
    // state: RouterStateSnapshot
  ): Observable<boolean> {

    return this.store.select(state => state.router.state.params.id)
      .pipe(
        take(1),
        map(val => uuid.test(val))
      );

  }

}
