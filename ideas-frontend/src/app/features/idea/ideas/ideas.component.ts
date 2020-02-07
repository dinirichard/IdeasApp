import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, LoadIdeas, UpvoteIdea, DownvoteIdea } from '../state';
import { Idea } from '@app/models/idea';
import { Observable } from 'rxjs';
import { Entity } from '@app/models/entity';
import { selectAllIdeas } from '../state/idea.selector';

@Component({
  selector: 'app-ideas',
  templateUrl: './ideas.component.html',
  styleUrls: ['./ideas.component.scss']
})
export class IdeasComponent implements OnInit {

  ideas: Observable<Idea[]>;
  constructor(
    private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new LoadIdeas());
    this.ideas = this.store.select(selectAllIdeas);
  }

  upvote(ideaId: string) {
    this.store.dispatch(new UpvoteIdea(ideaId));
  }

  downvote(ideaId: string) {
    this.store.dispatch(new DownvoteIdea(ideaId));
  }

}
