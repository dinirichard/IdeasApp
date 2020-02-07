import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { take, map } from 'rxjs/operators';

import { AppState, LoadIdea } from './state';
import { Subscription } from 'rxjs';

@Injectable()
export class IdeaResolver implements Resolve<void> {
    constructor(private store: Store<AppState>) { }

    resolve() {
        return this.store
            .select(state => state.router.state.params.id)
            .pipe(
                take(1),
                map(id => {
                    this.store.dispatch(new LoadIdea(id));
                })
            );
    }
}
