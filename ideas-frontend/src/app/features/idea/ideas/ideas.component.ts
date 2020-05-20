import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
    AppState,
    LoadIdeas,
    UpvoteIdea,
    DownvoteIdea,
    LoadMoreIdeas,
} from '../state';
import { Idea } from '@app/models/idea';
import { Observable } from 'rxjs';
import { Entity } from '@app/models/entity';
import { selectAllIdeas, selectIdeaLoader } from '../state/idea.selector';

@Component({
    selector: 'app-ideas',
    templateUrl: './ideas.component.html',
    styleUrls: ['./ideas.component.scss'],
})
export class IdeasComponent implements OnInit {
    ideas: Observable<Idea[]>;
    loading$: Observable<boolean>;
    constructor(private store: Store<AppState>) {}

    ngOnInit() {
        this.store.dispatch(new LoadIdeas());
        this.ideas = this.store.select(selectAllIdeas);
        this.loading$ = this.store.select(selectIdeaLoader);
    }

    upvote(ideaId: string) {
        console.log(ideaId);
        this.store.dispatch(new UpvoteIdea(ideaId));
    }

    downvote(ideaId: string) {
        console.log(ideaId);
        this.store.dispatch(new DownvoteIdea(ideaId));
    }

    onScroll() {
        console.log('Srolling Down!!');
        this.store.dispatch(new LoadMoreIdeas(2));
    }
}
