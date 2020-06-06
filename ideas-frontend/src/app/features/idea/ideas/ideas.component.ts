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
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { validateWhitespace } from '@app/utilities/validators';

@Component({
    selector: 'app-ideas',
    templateUrl: './ideas.component.html',
    styleUrls: ['./ideas.component.scss'],
})
export class IdeasComponent implements OnInit {
    ideas: Observable<Idea[]>;
    loading$: Observable<boolean>;
    newIdeaForm: FormGroup;

    constructor(private fb: FormBuilder, private store: Store<AppState>, public dialog: MatDialog) {}

    ngOnInit() {
        this.store.dispatch(new LoadIdeas());
        this.ideas = this.store.select(selectAllIdeas);
        this.loading$ = this.store.select(selectIdeaLoader);

        this.newIdeaForm = this.fb.group({
            topic: this.fb.control('', [validateWhitespace, Validators.required]),
            summary: this.fb.control('', [validateWhitespace, Validators.required]),
        });
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

    newIdeaSubmit() {
        
    }

    // openDialog() {
    //     const dialogRef = this.dialog.open(DialogNewIdeaComponent);

    //     dialogRef.afterClosed().subscribe(result => {
    //         console.log(`Dialog result: ${result}`);
    //     });
    // }
}

@Component({
    selector: 'app-dialog-new-idea',
    templateUrl: './dialog-new-idea.html',
    styleUrls: ['./dialog-new-idea.scss'],
})
export class DialogNewIdeaComponent { }
