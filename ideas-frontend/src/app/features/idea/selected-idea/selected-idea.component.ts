import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState, CreateComment, LoadIdeaComments, UpvoteIdea, DownvoteIdea } from '../state';
import { selectCurrentIdea } from '../state/idea.selector';
import { Subscription, Observable, from } from 'rxjs';
import { Idea } from '@app/models/idea';
import { Comment, CommentDTO } from '@app/models/comment';
import { FormGroup, FormBuilder } from '@angular/forms';
import { validateWhitespace } from '@app/utilities/validators';
import { toArray, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-selected-idea',
  templateUrl: './selected-idea.component.html',
  styleUrls: ['./selected-idea.component.scss']
})
export class SelectedIdeaComponent implements OnInit, OnDestroy {

  idea: Idea;
  comments: Observable<Comment[]>;
  commentsobs: Observable<Idea>;
  commentForm: FormGroup;

  private subcription$: Subscription;

  constructor(private fb: FormBuilder, private store: Store<AppState>) { }

  ngOnInit() {
    this.commentsobs = this.store.pipe(select(selectCurrentIdea));

    this.subcription$ = this.store
      .select(selectCurrentIdea)
      .subscribe(val => {
        this.idea = val;
        console.log(this.idea);
      });
    this.store.dispatch(new LoadIdeaComments(this.idea.id));
    this.comments = this.store.select(state => state.ideas.selectedIdeaComments);

    this.commentForm = this.fb.group({
      text: this.fb.control('', [validateWhitespace])
    });

  }

  ngOnDestroy() {
    this.subcription$.unsubscribe();
  }

  submitComment() {
    const val = this.commentForm.getRawValue() as CommentDTO;
    this.store.dispatch(new CreateComment(this.idea.id, val));
  }

  upvote(ideaId: string) {
    this.store.dispatch(new UpvoteIdea(ideaId));
  }

  downvote(ideaId: string) {
    this.store.dispatch(new DownvoteIdea(ideaId));
  }



}
