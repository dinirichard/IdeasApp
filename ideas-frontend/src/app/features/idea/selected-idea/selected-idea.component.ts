import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
    AppState,
    CreateComment,
    LoadIdeaComments,
    UpvoteIdea,
    DownvoteIdea,
    LoadMoreComments,
    LoadMoreIdeas,
} from '../state';
import { selectCurrentIdea, selectAllIdeas } from '../state/idea.selector';
import { Subscription, Observable, from } from 'rxjs';
import { Idea } from '@app/models/idea';
import { Comment, CommentDTO } from '@app/models/comment';
import { FormGroup, FormBuilder } from '@angular/forms';
import { validateWhitespace } from '@app/utilities/validators';
import { toArray, mergeMap } from 'rxjs/operators';

@Component({
    selector: 'app-selected-idea',
    templateUrl: './selected-idea.component.html',
    styleUrls: ['./selected-idea.component.scss'],
})
export class SelectedIdeaComponent implements OnInit, OnDestroy {
    idea: Idea;
    comments: Observable<Comment[]>;
    commentsobs: Observable<Idea>;
    commentForm: FormGroup;
    loadComment: boolean;
    commentPage = 1;

    private subcription$: Subscription;

    constructor(private fb: FormBuilder, private store: Store<AppState>) {}

    ngOnInit() {
        this.commentsobs = this.store.pipe(select(selectCurrentIdea));

        this.subcription$ = this.store
            .select(selectCurrentIdea)
            .subscribe(val => {
                this.idea = val;
                console.log(this.idea);
            });
        this.store.dispatch(new LoadIdeaComments(this.idea.id));
        this.comments = this.store.select(
            state => state.ideas.selectedIdeaComments,
        );

        this.commentForm = this.fb.group({
            text: this.fb.control('', [validateWhitespace]),
        });

        this.comments.subscribe(comments => {
            this.loadComment = comments
                ? comments.length < this.idea.commentNo
                    ? true
                    : false
                : false;
            console.log(this.loadComment);
        });
    }

    ngOnDestroy() {
        this.subcription$.unsubscribe();
        // this.comments.unsubscribe();
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

    loadMoreComments() {
        this.commentPage++;
        this.store.dispatch(
            new LoadMoreComments(this.idea.id, this.commentPage.toString()),
        );

        // this.store.dispatch(new LoadMoreIdeas(2, this.idea.id));
        // let g;
        // this.store.select(selectAllIdeas).subscribe(val => {
        //     g = val;
        //     console.log(g);
        // });

        // this.commentsobs = this.store.pipe(select(selectCurrentIdea));
        // this.subcription$ = this.store
        //     .select(selectCurrentIdea)
        //     .subscribe(val => {
        //         this.idea = val;
        //         console.log(this.idea);
        //     });
        // console.log([...g, ...g]);
    }
}
